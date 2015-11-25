'use strict'

var Factory = require('../utils/factory');

var FrameBuffer = function(Core, that) {

    var that = that || {};
    var gl = Core;
    var width = 512; 
    var height = 512; 

    that.framebuffer = gl.createFramebuffer();
    that.depthbuffer = gl.createRenderbuffer();


    var settingTexture = function() {
        that.texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, that.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB,
            gl.UNSIGNED_SHORT_5_6_5, null);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }();

    var createRender = function(){
      gl.bindRenderbuffer(gl.RENDERBUFFER, that.depthbuffer); 
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

    }();


    return that;
};
