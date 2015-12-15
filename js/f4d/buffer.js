'use strict';

var buffer = function(gl) {
    var that = {};
    var gl = gl,
        vertex_buffer = null,
        size = 0;

    that.buffer = gl.createBuffer();

    that.create = function(list, draw_type) {
        that.len = list.length;

        gl.bindBuffer(gl.ARRAY_BUFFER, that.buffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(list),
            draw_type
        );
    };

    that.use = function() {
        gl.bindBuffer(gl.ARRAY_BUFFER, that.buffer);
    };

    that.update = function(list) {
        that.create(list, gl.DYNAMIC_DRAW);
    };

    that.save = function(list) {
        that.create(list, gl.DYNAMIC_DRAW);
    };

    return that;
}

module.exports = buffer;
