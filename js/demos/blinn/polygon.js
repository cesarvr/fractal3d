'use strict';
var glm = require('gl-matrix');


var Point = function(vertex, colors, uv) {

    this.vertex = vertex;
    this.color = colors;
    this.uv = uv;
};


var Poly = function() {

    var that = {};
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
        var color = new vec4(0.8, 0.8, 0.8, 1.0);

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
        var roty = new mat3().setIdentity();
        roty.row1.setValues(Math.cos(dgToRad(angle)), 0, Math.sin(dgToRad(angle)));
        roty.row3.setValues(-Math.sin(dgToRad(angle)), 0, Math.cos(dgToRad(angle)));

        return roty;
    };

    that.rotx = function(angle) {
        var rot = new mat3().setIdentity();
        rot.row2.setValues(0, Math.cos(dgToRad(angle)), -Math.sin(dgToRad(angle)));
        rot.row3.setValues(0, Math.sin(dgToRad(angle)), Math.cos(dgToRad(angle)));

        return rot;
    };


    that.rotz = function(angle) {
        var rot = new mat3().setIdentity();
        rot.row1.setValues(Math.cos(dgToRad(angle)), -Math.sin(dgToRad(angle)), 0);
        rot.row2.setValues(Math.sin(dgToRad(angle)), Math.cos(dgToRad(angle)), 0);
        rot.row3.setValues(0, 0, 1);

        return rot;
    };

    function makeModule(seed, reflectRot, rotationFn, dx) {
        var mod = [];
        mod.push(seed.copy());
        var reflect = seed.copy().multiply(reflectRot(180)).copy(); //reflection of the seed.
        mod.push(reflect.copy());

        /* seed and his reflection rotate around z-axis create a face. */
        for (var m = 90; m <= 360; m += 90) {
          mod.push(seed.multiply(rotationFn(m)).copy());
          mod.push(reflect.multiply(rotationFn(m)).copy());
        }

        return mod;
    };



    function translate(x, y, z) {

        var _x = x;
        var _y = y;
        var _z = z;

        return function(m) {
            m.row1.add(new vec3(_x, _y, _z));
            m.row2.add(new vec3(_x, _y, _z));
            m.row3.add(new vec3(_x, _y, _z));
            return m;
        }
    };


    function mirrorModule(mtxs, transform, rot, dx) {
        var modul3 = [];

        mtxs.forEach(function(mtx) {
            modul3.push(transform(mtx.copy().multiply(rot(90))));
        });

        return modul3;
    }


    function setFace(mtxs) {
        mtxs.forEach(function(mtx) {
            that.setGeometry(mtx);
        });
    }

    function Faces(){
        var matrices = [];

        return {
            add: function(mtx){
               matrices = matrices.concat(mtx);
            },

            each: function(cb){
                matrices.forEach(cb);
            },

            inflate: function(dx){
                matrices.forEach(function(m){
                    if(m.row3.z > 0){
                    m.row3.z += dx;
                    m.row1.z += dx;
                    m.row2.z += dx;
                    }else{
                    m.row3.z -= dx;}

                    if(m.row3.y > 0){
                    m.row3.y += dx;
                    }else{
                    m.row3.y -= dx;}

                });
            },

            get: function(){
                return matrices;
            }

        };
    }


    that.cube = function(size, dx) {

        that.geometry = [];
        that.drawType = 'TRIANGLES';

        var cube = Faces();
        var m1 = new mat3();

        m1.row1.setValues(-1, 1, 0);
        m1.row2.setValues(0, 1, 0);
        m1.row3.setValues(0, 0, 0);


        var inflation = Math.abs( Math.sin((dx)) * 1.5 );
        var body = 5;
        m1.multiplyByScalar(size);



        var tleft = translate(-body, 0, body);
        var tright = translate(body, 0, body);

        var tup = translate(0, body, body);
        var tdown = translate(0, -body, body);

        var tfront = translate(0, 0, 10);

        var m = makeModule(m1, that.roty, that.rotz, dx);


        cube.add(m);

        cube.add( mirrorModule(m, tfront,  that.rotz, dx) );

        cube.add( mirrorModule(m, tleft,  that.roty, dx) );
        cube.add( mirrorModule(m, tright, that.roty, dx) );

        cube.add( mirrorModule(m, tup, that.rotx, dx) );
        cube.add( mirrorModule(m, tdown, that.rotx, dx) );


       setFace(cube.get());

        return that;
    };





    that.plane = function(size, dx) {

        that.geometry = [];
        that.drawType = 'TRIANGLES';

        var cube = Faces();
        var m1 = new mat3();

        m1.row1.setValues(-1, 1, 0);
        m1.row2.setValues(0, 1, 0);
        m1.row3.setValues(0, 0, 0);


        var inflation = Math.abs( Math.sin((dx)) * 1.5 );
        var body = 5;
        m1.multiplyByScalar(size);



        var tleft = translate(-body, 0, body);
        var tright = translate(body, 0, body);

        var tup = translate(0, body, body);
        var tdown = translate(0, -body, body);

        var tfront = translate(0, 0, 10);

        var m = makeModule(m1, that.roty, that.rotz, dx);


        cube.add(m);

        cube.add( mirrorModule(m, tfront,  that.rotz, dx) );

        cube.add( mirrorModule(m, tleft,  that.roty, dx) );
        cube.add( mirrorModule(m, tright, that.roty, dx) );

        cube.add( mirrorModule(m, tup, that.rotx, dx) );
        cube.add( mirrorModule(m, tdown, that.rotx, dx) );


        if(inflation)
            cube.inflate(inflation);

        setFace(cube.get());

        return that;
    };

    that.getDrawType = function() {
        return that.drawType;
    };

    return that;
}

module.exports = Poly;
