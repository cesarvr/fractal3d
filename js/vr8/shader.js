'use strict'

var Factory = require('../utils/factory');

var Shader = function(Core, that) {
    var gl = Core;
    var program = null;
    that.vars = {};
    that.cache = {};

    var parse = function(code) {
        if (code instanceof HTMLElement) {
            return code.innerHTML;
        }

        return code;
    }

    that.add = function(shaderCode, type) {
        var shader = null;

        if (type === 'fragment')
            shader = gl.createShader(gl.FRAGMENT_SHADER);

        if (type === 'vertex')
            shader = gl.createShader(gl.VERTEX_SHADER);

        gl.shaderSource(shader, shaderCode);
        gl.compileShader(shader);

        var error = gl.getShaderInfoLog(shader);

        if (error.length > 0) {
            throw error;
        }

        return shader;
    }

    that.use = function() {
        gl.useProgram(program);
    }

    that.attribute = function(param) {
        that.vars[param] = gl.getAttribLocation(program, param);
        if (that.vars[param] < 0) throw " Error attribute " + param + " not found.";
        gl.enableVertexAttribArray(that.vars[param]);
        return this;
    }

    that.uniform = function(param) {
        that.vars[param] = gl.getUniformLocation(program, param);
        if (!that.vars[param]) throw " Error uniform " + param + " not found.";
        return this;
    }

    that.create = function(code) {

        if (code && code.vertex && code.fragment) {
            that.link(parse(code.vertex), parse(code.fragment));
            code.init(that);
        }
    }





    that.link = function(vertex, fragment) {
        program = gl.createProgram();

        gl.attachShader(program, that.add(vertex, 'vertex'));
        gl.attachShader(program, that.add(fragment, 'fragment'));
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw 'error linking shaders: ' + gl.getProgramInfoLog(program);
        }
    }

    var unify = function(_obj) {
        var obj = _obj;
        var param = obj.param;

        return function(value) {
            obj.args[param] = value;
            obj.method.apply(gl, obj.args);
        }
    }

    var saveIntoCache = function(shaderId, key, val) {
        if (val instanceof Float32Array) {
            that.cache[key] = unify({
                method: gl.uniformMatrix4fv,
                args: [shaderId, false, val],
                param: 2
            });
        }

        if (typeof val === 'number') {
            that.cache[key] = unify({
                method: gl.uniform1f,
                args: [shaderId, val],
                param: 1
            });
        }
    }

    that.prepare = function(shaderVariables) {
        for (var key in shaderVariables) {
            if (that.cache[key]) {
                that.cache[key](shaderVariables[key]);
            } else {
                saveIntoCache(that.vars[key], key, shaderVariables[key]);
            }
        }
    }

    return that;
}

module.exports = new Factory(Shader);
