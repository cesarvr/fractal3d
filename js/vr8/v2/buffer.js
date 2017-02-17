'use strict';

const _ = require('underscore');

var Buffer = function(gl) {

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    function stride(memo, attrib) {
        return attrib.size + memo;
    }

    function vapWrapper(attr, size, stride, offset) {
        return function() {
            gl.vertexAttribPointer(
                attr,
                size,
                gl.FLOAT,
                false,
                stride,
                offset
            );
        };
    }



    //  
    //  one package is equivalent to one vertex example: 
    //
    //            position    texture
    //  vertex = [x, y, z, w]  [u,v]  <= package 
    //  
    //  attrib pointer size for position is 4
    //  stride for position is 6  
    //  offset for position is 0 
    //
    //  attrib pointer size for texture is 2
    //  stride for position is 6 
    //  offset for position is 4 
    //
    //  vertex_data 
    //   @attrib: shader vertex attribute pointer. 
    //   @size: attribute length 
    //   @stride: package size 
    //   @offset: position inside the package. 

    this.pack = function(vx_attributes) {
        debugger;
        var packet = {};

        packet.stride = _.reduce(vx_attributes, stride, 0);
        packet.attributes = vx_attributes;

        return packet;
    };




    this.upload = function(packet) {
        debugger;

        var attrs = packet.attributes;
        var attrs_batch = []; 
        var offset = 0;

        for (var key in attrs) {

          var _vc = vapWrapper(attrs[key].value,
                               attrs[key].size, 
                               packet.stride, 
                               offset);

          offset += attrs[key].size; 
        }

    };


    // Cache a matrix of floating points in to opengl ARRAY
    this.save = function(vertex) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertex.points),
            gl.DYNAMIC_DRAW
        );
    };


};



module.exports = Buffer;
