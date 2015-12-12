'use strict'

var Factory = require('../utils/factory');

var Buffer = function(Core, that) {

    var gl = Core;
    var buffer = gl.createBuffer();
    var vertexDataSize = 0,
        bufferPerVertex = 0;

    var that = that || {};
    var pipeline = [];

    that.sides = 0;


    var save = function(list, bufferType) {
        vertexDataSize = list.length;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(list),
            bufferType
        );
    }

    /*
     * obj
     *  name: shader attribute name.
     *  value: number of values per attribute.
     */

    var prepare = function(_obj) {
        var object = _obj;

        return function(stride) {
            gl.vertexAttribPointer(
                object.name,
                object.value,
                gl.FLOAT,
                false,
                stride,
                object.offset // starting from. 
            );
        }
    }

    that.load = function(list) {
        save(list, gl.STATIC_DRAW);
        return that;
    }

    that.update = function(list) {
        save(list, gl.DYNAMIC_DRAW);
        return that;
    }

    /* @order 
     * organize the interleave order.
     * obj
     *    name: shader attribute name.
     *    value: number of values per attribute.
     *
     */
    that.order = function(shaderMap, obj) {
        var bufferPerVertex = 0;

        Object.keys(obj).forEach(function(key) {

            pipeline.push(prepare({
                name: shaderMap[key],
                value: obj[key],
                offset: (bufferPerVertex * Float32Array.BYTES_PER_ELEMENT),
            }));

            bufferPerVertex += obj[key];
        });

        that.sides = vertexDataSize / bufferPerVertex;

        that.loadAttributes = function() {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

            for (var vertexAttrib in pipeline) {
                pipeline[vertexAttrib](bufferPerVertex * Float32Array.BYTES_PER_ELEMENT);
            }
        }

        return that;
    }

    return that;
}


module.exports = new Factory(Buffer);
