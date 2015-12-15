'use strict'

var texture = function(gl) {
    var that = {};
    var gl = gl;
    that.texture = gl.createTexture();


    that.setTexture = function(pixels, width, height) {

        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.bindTexture(gl.TEXTURE_2D, that.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB,
            gl.UNSIGNED_BYTE, pixels);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    };

    that.prepare = function(vars) {
        if (!this.initialize) return;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, that.texture);
        gl.uniform1i(vars['uSampler'], 0);
    };

    return that;
};



module.exports = texture;
