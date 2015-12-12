'use strict';

var Core = require('../vr8/core');
var Transform = require('../mathv2/transform');

var Renderable = function(){

  this.modelViewMatrix = new Float32Array();
  this.modelMatrix = Transform.New();
  this.shader = null; 
  this.buffer = null;

}

module.exports = Renderable;
