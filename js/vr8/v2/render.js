'use strict';

var _ = require('underscore');

/*
  opts
    gl: WebGL browser object,
    shader: vr8/Shader object,
    @width:  viewport width,
    @height: viewport height
*/

var Render = function(opts) {
    var gl = opts.gl;
    var shader = opts.shader;
    var camera = opts.camera;

    if (_.isUndefined(opts.gl)) throw 'gl library is missing!!.';
    if (_.isUndefined(opts.shader)) throw 'The shader is missing!!.';
    if (_.isUndefined(opts.camera)) throw 'The camera matrix is missing!!.';

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, opts.width, opts.height);

    this.clear = function() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return this;
    };

    this.prepare = function(model, buffer) {
      debugger;
        shader.set_value('MV', camera);
        shader.set_value('P', model);

        if (buffer) {
            for (var batch in buffer)
                buffer[batch]();

        }

        return this;
    };

    /*
      Draw the stuff...
    */
    this.draw = function(type,  sides) {
      gl.drawArrays(type, 0, sides);
    };

};


module.exports = Render;
