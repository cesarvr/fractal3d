'use strict';

/*
  opts
    gl: WebGL browser object,
    shader: vr8/Shader object,
    @width:  viewport width,
    @height: viewport height
*/

var Scene = function(opts){
  var gl = opts.gl;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.viewport(0, 0, opts.width, opts.height);

  this.updload = function(){

  };

  this.clean = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  };

  this.draw = function(entity) {
      if (gl[entity.drawType] !== -1)
          gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
      else
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
  };

  this.render = function(){

  };

};


module.exports = Scene;
