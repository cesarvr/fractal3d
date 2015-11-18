var Factory = require('../../utils/factory');
var Vec3 = require('../../mathv2/vector').Vec3;
var Vec4 = require('../../mathv2/vector').Vec4;
var Mat4 = require('../../mathv2/matrix4');
var Transform = require('../../mathv2/transform');



var Point = function(vertex, colors, uv) {

    this.vertex = vertex;
    this.color = colors;
    this.uv = uv;
};


var Poly = function(Core, that) {

    that.drawType = 'TRIANGLE_STRIP';
    that.geometry = [];    

    that.getModel = function() {
        var tmp = [];
        that.geometry.forEach(function(renderable) {
            tmp.push(
                renderable.vertex.x,
                renderable.vertex.y,
                renderable.vertex.z,

                renderable.color.x,
                renderable.color.y,
                renderable.color.z,
                renderable.color.w,

                renderable.uv.u,
                renderable.uv.v
            );
        });

        return new Float32Array(tmp);
    };

    that.rotateX = function(geometry){
        geometry.forEach(function(point){
           point.vertex.dot( ) 

        });       

    };


    that.plane = function(width, height) {
        var color = Vec4.New(0.8, 0.8, 0.8, 1.0);

        that.geometry.push(new Point(Vec3.New(-width, -height), color, {
            u:0, v:0
        }));

        that.geometry.push(new Point(Vec3.New(width, -height), color, {
            u:1, v:0
        }));

        that.geometry.push(new Point(Vec3.New(-width, height), color, {
            u:0, v:1
        }));

        that.geometry.push(new Point(Vec3.New(width, height), color, {
            u:1, v:1
        }));
            
        that.rotateX(that.geometry); 


        return that;
    };

    that.getDrawType = function() {
        return that.drawType;
    };

    return that;
};

module.exports = new Factory(Poly);
