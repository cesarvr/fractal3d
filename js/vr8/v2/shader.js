'use strict';
var _ = require('underscore');

var LINKER_ERROR = "Error linking shaders.";
var SHADER_CREATION_ERROR = "Error while creating the shader.";
var COMPILE_ERROR = "Error while compiling the shader code.";

var Shader = function(gl) {

    const SHADER_TYPE = {
        "shader": gl.FRAGMENT_SHADER,
        "vertex": gl.VERTEX_SHADER
    };

    var VECTOR_MAP = {}; 

    VECTOR_MAP[gl.FLOAT_VEC2] = 2;
    VECTOR_MAP[gl.FLOAT_VEC3] = 3;
    VECTOR_MAP[gl.FLOAT_VEC4] = 4;


    var program = gl.createProgram();

    var attrib  = _.partial(gl.getAttribLocation.bind(gl), program);
    var uniform = _.partial(gl.getUniformLocation.bind(gl), program);
    var attach  = _.partial(gl.attachShader.bind(gl), program);
    var vertexInfo  = gl.getActiveAttrib.bind(gl);
    var uniformInfo = gl.getActiveUniform.bind(gl);

    // compile the glsl source code. 
    function compile(source) {

        var shader = gl.createShader(SHADER_TYPE[source.type]);

        if (!shader) {
            throw SHADER_CREATION_ERROR;
            console.error(SHADER_CREATION_ERROR + JSON.stringify(source));
        }

        gl.shaderSource(shader, source.code);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw COMPILE_ERROR;
            console.error(COMPILE_ERROR);
        }

        return shader;
    };

    // fetch code from the dom. 

    function fetch_code(template) {
        var d = document.createElement('div');
        d.innerHTML = template;

        return [{
            type: 'shader',
            code: d.querySelector('#fragment-shader').innerHTML.trim()
        }, {
            type: 'vertex',
            code: d.querySelector('#vertex-shader').innerHTML.trim()
        }];
    };

    function link() {
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(LINKER_ERROR)
            throw LINKER_ERROR;
        }
    }

    function gl_info(webGLActiveInfo, hash) {
        var tmp = {}; 

        tmp[webGLActiveInfo.name] = {
          value:  gl.getAttribLocation(program, webGLActiveInfo.name),
          size:   VECTOR_MAP[webGLActiveInfo.type],
          length: VECTOR_MAP[webGLActiveInfo.type] * Float32Array.BYTES_PER_ELEMENT
        };

        return _.extend(hash, tmp);
    }

    function discovery(retrieveAPI, _glvars, _index) {
        var index  = _index || 0;
        var glvars = _glvars || {};
        var active = retrieveAPI(program, index);

        if (active !== null) {
            glvars = gl_info(active, glvars);
            return discovery(retrieveAPI, glvars, ++index);
        } else
            return glvars;
    }

    var compileAndAttach = _.compose(attach, compile);

    this.create = function(template) {

        var code = fetch_code(template);

        code.forEach(compileAndAttach);

        link();
    }
    
    this.getVertexInfo = function(){
      return discovery(vertexInfo);
    };

    this.getUniformInfo = function(){
      return discovery(uniformInfo);
    };
};

module.exports = Shader;
