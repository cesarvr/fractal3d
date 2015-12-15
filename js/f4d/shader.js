'use strict';
var shader = function(gl) {

    var that = {};
    var gl = gl;
    var shader_type = {
        'fragment': gl.FRAGMENT_SHADER,
        'vertex': gl.VERTEX_SHADER
    };

    that.attrs = {};
    that.uniforms = {};
    that.uniform_fn = {};
    that.program = null;

    var parse = function(code) {
        if (code instanceof HTMLElement) {
            return code.innerHTML;
        }

        return code;
    };

    var attrib_length = function(type) {

        if (type === gl.FLOAT_VEC2)
            return 2;

        if (type === gl.FLOAT_VEC3)
            return 3;

        if (type === gl.FLOAT_VEC4)
            return 4;
    };

    var attrib_byte_length = function(shader_var) {
        return attrib_length(shader_var.info.type) * Float32Array.BYTES_PER_ELEMENT;
    };

    var sum = function(fn) {
        var sum = 0;

        return function(o) {
            sum += fn(o);
            return sum;
        };
    };


    var look_up = function(gl_callback, type, locator_fn) {

        var cnt = gl.getProgramParameter(that.program, type);

        var shader_vars = {};
        var gl_variants = {};

        for (var i = 0; i < cnt; i++) {

            gl_variants = gl_callback.call(gl, that.program, i);
            var value = locator_fn.call(gl, that.program, gl_variants.name);

            shader_vars[gl_variants.name] = {
                info: gl_variants,
                value: value,
            };

        };

        return shader_vars;
    };

    var each_attrib = function(cb) {
        var tmp = null;
        Object.keys(that.attrs).forEach(function(key) {
            var shader_var = that.attrs[key];
            tmp = cb(shader_var);
        });

        return tmp;
    };

    var make_attribute = function(index, vector_size,  size, offset) {

        console.log('index-> ', index, ' vector_size-> ', vector_size,   ' size->', size, ' ofsset->', offset );

        gl.enableVertexAttribArray(index);

        return function() {


            gl.vertexAttribPointer(
                index,
                vector_size,
                gl.FLOAT,
                false,
                size,
                offset // starting from. 
            );
        };
    };

    that.get_vertex_attrib = function() {
        var cache = [];
        var size = each_attrib(sum(attrib_byte_length));
        var offset = 0;

        each_attrib(function(shader_vars) {
            cache.push( make_attribute(shader_vars.value, attrib_length(shader_vars.info.type)  ,size, offset) );
            offset += attrib_byte_length(shader_vars);
        });

        that.per_vertex_size = size / Float32Array.BYTES_PER_ELEMENT; 
        return cache;
    };

    that.get_shader_vars = function() {

        console.log(' ===== loading attrs ====');
        that.attrs = look_up(gl.getActiveAttrib, gl.ACTIVE_ATTRIBUTES, gl.getAttribLocation);
        console.log(' ==========================');

        console.log(' ===== loading uniform ====');
        that.uniforms = look_up(gl.getActiveUniform, gl.ACTIVE_UNIFORMS, gl.getUniformLocation);
        console.log(' ==========================');
    };

    that.use = function() {
        gl.useProgram(that.program);
    };

    that.create = function(vertex, fragment) {

        if (vertex && fragment) {
            that.program = that.link(parse(vertex), parse(fragment));
            that.get_shader_vars();
        }
    };



    that.compile = function(shaderCode, type) {

        var shader = gl.createShader(shader_type[type]);

        gl.shaderSource(shader, shaderCode);
        gl.compileShader(shader);

        var error = gl.getShaderInfoLog(shader);

        if (error.length > 0) {
            throw error;
        }
        console.log('[compiled] ok');

        return shader;
    };


    that.link = function(vertex, fragment) {
        var program = gl.createProgram();

        gl.attachShader(program, that.compile(vertex, 'vertex'));
        gl.attachShader(program, that.compile(fragment, 'fragment'));
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw 'error linking shaders: ' + gl.getProgramInfoLog(program);
        }

        console.log('[linked] ok');
        return program;
    };


    that.set_uniform = function(var_name, value) {

        if (that.uniform_fn[var_name]) {
            that.uniform_fn[var_name](value);
            return;
        }

        /* generate the function */
        if (that.uniforms[var_name].info.type === gl.FLOAT_MAT4) {

            var u = that.uniforms[var_name].value;
            var size = that.uniforms[var_name].info.size;

            var fn = gl.uniformMatrix4fv;
            that.uniform_fn[var_name] = fn.bind(gl, u, false);

            that.uniform_fn[var_name](value);
            return;
        }
    };

    that.attributes = function(attrs) {
        attrs.forEach(attribute);
    }

    that.add_uniforms = function(list) {
        list.forEach(uniform);
    }

    return that;
}


module.exports = shader;
