'use strict';

var vector4 = require('./vector4');
var matrix4 = require('./matrix4');

/*
 * Degree to radian.
 */
function dgToRad(angle){
    return (angle*Math.PI) / 180;
};

var transform = function(m) {

    var that = {};
    var _m = m || new matrix4().setIdentity();
    var cos = Math.cos;
    var sin = Math.sin;
  

    that.translate = function(m, vec3) {
        m.row1.w = vec3.x || 0.0;
        m.row2.w = vec3.y || 0.0;
        m.row3.w = vec3.z || 0.0;

        return m;
    }

    that.scale = function(x, y, z) {
        _m.row1.x = x || 0.0;
        _m.row2.y = y || 0.0;
        _m.row3.z = z || 0.0;

        return that;
    }

    that.rotatex = function(_m, angle) {
        var tetha = dgToRad(angle);
        var _cos = cos(tetha);
        var _sin = sin(tetha);

        _m.row2.y = _cos || 0.0;
        _m.row2.z = -_sin || 0.0;
        _m.row3.y = _sin || 0.0;
        _m.row3.z = _cos || 0.0;

        return that;
    }


    that.rotateY = function(angle) {
        var tetha = dgToRad(angle);

        var _cos = cos(tetha);
        var _sin = sin(tetha);

        _m.row1.x = _cos;
        _m.row1.z = _sin;
        _m.row3.x = -_sin;
        _m.row3.z = _cos;

        return that;
    }

    that.rotateZ = function(angle) {
        var tetha = dgToRad(angle);

        var _cos = cos(tetha);
        var _sin = sin(tetha);

        _m.row1.x = _cos;
        _m.row1.y = -_sin;
        _m.row2.x = _sin;
        _m.row2.z = _cos;


        return that;
    }


    that.matrix = function(){
      return _m;
    }


    /*

      Make a LookAt Matrix.

      http://www.cs.virginia.edu/~gfx/Courses/1999/intro.fall99.html/lookat.html

    */

    that.look_at = function(eye, center, up) {
        var F = center.sub(eye).normalize();
        var U = up.normalize();
        var S = F.cross(U).normalize();

        U = S.cross(F);

        var M = new matrix4().setIdentity().set(S, U, F.inverse());

        var negEye = eye.inverse();

        return that.translate(M, eye, 1);
    };

    that.make_perspective = function(fieldOfView, aspectRatio, nearZ, farZ) {
        var M = new matrix4().setIdentity();
        var cotan = 1.0 / Math.tan(fieldOfView / 2.0);
        return M.set(
            new vector4(cotan / aspectRatio),
            new vector4(0.0, cotan),
            new vector4(0.0, 0.0, ((farZ + nearZ) / (nearZ - farZ)), ((2.0 * farZ * nearZ) / (nearZ - farZ))),
            new vector4(0.0, 0.0, -1.0, 0.0)
        );
    };

    return that;
}



module.exports = transform;
