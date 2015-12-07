'use strict'

var Factory = require('../utils/factory');

var Texture = function(gl) {
    this.texture = gl.createTexture();
    this.gl = gl;
}

Texture.prototype.create = function(width, height) {
    var gl = this.gl;

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB,
        gl.UNSIGNED_SHORT_5_6_5, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}

var FrameBuffer = function(Core, that) {

    var that = that || {};
    var gl = Core;
    var width = 512;
    var height = 512;

    that.framebuffer = gl.createFramebuffer();
    that.depthbuffer = gl.createRenderbuffer();


    that.create = function(_width, _height) {

        var texture = new Texture(gl);
        texture.create(_width || width, _height || width); //default 512 x 512. 

        gl.bindFramebuffer(gl.FRAMEBUFFER, that.framebuffer);
        gl.bindRenderbuffer(gl.RENDERBUFFER, that.depthbuffer);

        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);


        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D, texture.texture, 0);

        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, that.depthbuffer);
    }

    that.render = function(renderCb) {
        gl.bindRenderbuffer(gl.RENDERBUFFER, that.depthbuffer);

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
            renderCb();
        }
    }

    return that;
};


module.exports = new Factory(FrameBuffer);
