var Factory = require('../../utils/factory');
var Vec3 = require('../../mathv2/vector').Vec3;
var Vec4 = require('../../mathv2/vector').Vec4;
var Mat4 = require('../../mathv2/matrix4');
var Mat3 = require('../../mathv2/matrix3');
var Transform = require('../../mathv2/transform');



var Point = function(vertex, colors, uv) {

    this.vertex = vertex;
    this.color = colors;
    this.uv = uv;
};


var Poly = function(Core, that) {

    that.drawType = 'TRIANGLE_STRIPS';
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

    that.setGeometry = function(m) {
        var color = Vec4.New(0.8, 0.8, 0.8, 1.0);

        that.geometry.push(new Point(m.row1, color, {
            u: 0,
            v: 1
        }));
        that.geometry.push(new Point(m.row2, color, {
            u: 1,
            v: 1
        }));
        that.geometry.push(new Point(m.row3, color, {
            u: 1,
            v: 0
        }));

    };

    /*
     * Degree to radian.
     */
    function dgToRad(angle) {
        return (angle * Math.PI) / 180;
    };


    that.roty = function(angle) {
        var roty = Mat3.Identity();
        roty.row1.setValues(Math.cos(dgToRad(angle)),0, Math.sin(dgToRad(angle)));
        roty.row3.setValues(-Math.sin(dgToRad(angle)),0 , Math.cos(dgToRad(angle)));

        return roty;
    };

   that.rotx = function(angle) {
        var rot = Mat3.Identity();
        rot.row2.setValues(0, Math.cos(dgToRad(angle)), -Math.sin(dgToRad(angle)));
        rot.row3.setValues(0, Math.sin(dgToRad(angle)), Math.cos(dgToRad(angle)));

        return rot;
    };


    that.rotz = function(angle) {
        var rot = Mat3.Identity();
        rot.row1.setValues( Math.cos(dgToRad(angle)), -Math.sin(dgToRad(angle)), 0);
        rot.row2.setValues( Math.sin(dgToRad(angle)),  Math.cos(dgToRad(angle)), 0);
        rot.row3.setValues(0,0,1);

        return rot;
    };

    function makeModule(seed){
        var mod = [];
        mod.push(seed.copy());
        var reflect = seed.copy().multiply(that.roty(180)).copy();  //reflection of the seed.
        mod.push(reflect.copy()); 

        /* seed and his reflection rotate around z-axis create a face. */
       /* for(var m = 90; m<=360; m+=90){
          mod.push(seed.multiply(that.rotz(m)).copy());  
          mod.push(reflect.multiply(that.rotz(m)).copy());  
        }*/

        return mod;
    };

    function mirrorModule(mtxs , dx){
      mtxs.forEach(function(mtx){
       mtxs.push( mtx.copy().multiply(that.rotx(90)) );
      });
    }

    function setFace(mtxs) {
      mtxs.forEach(function(mtx){
        that.setGeometry(mtx);
      });
    }

    that.plane = function(dx) {

        that.geometry = [];
        that.drawType = 'TRIANGLES';
/*
        var m1 = Mat3.New();

        m1.row1.setValues(-1, 1, 0);
        m1.row2.setValues(0, 1, 0);
        m1.row3.setValues(0, 0, 0);
*/

        var m2 = Mat3.New();

        m2.row1.setValues(-1, -1, 0);
        m2.row2.setValues(-1, -1, 1);
        m2.row3.setValues(1, -1, 1);



        m2.multiplyByScalar(5);
        
        that.setGeometry(m2);   

        //var m = makeModule(m2); 
        //mirrorModule(m, dx);
        //setFace(m);
        
        that.setGeometry(m2.copy().multiply(that.roty(dx)));
        
        return that;
    };

    that.getDrawType = function() {
        return that.drawType;
    };

    return that;
}

module.exports = new Factory(Poly);
