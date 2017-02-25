'use strict';

var Core = function(options) {
    var CanvasGL = require('./canvas');
    var Camera = require('./camera');


    var core = new CanvasGL(options.fullscreen, options.element);
    var webGL = core.getWebGL();

    this.canvas = core;

    this.getUtils = function() {
        return {
            camera: new Camera(),
            util: require('../utils/util')
        };
    };

    this.getWebGL = function(){
      return webGL;
    };

    this.MLib = {
        Vec3: require('../mathv2/vector').Vec3,
        Vec4: require('../mathv2/vector').Vec4,
        Mat4: require('../mathv2/matrix4'),
        Mat3: require('../mathv2/matrix3'),
        Transform: require('../mathv2/transform'),
    };
};

module.exports = Core;
