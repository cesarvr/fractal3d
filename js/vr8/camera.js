'use strict'

var Vec4  = require('../mathv2/vector').Vec4;
var Matrix  = require('../mathv2/matrix4');
var Transform = require('../mathv2/transform');

var Camera = function(){

this.MakeOrtho = function(left, right, bottom, top, nearz, farz) {
    var m = new Float32Array(16);
    m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = 0.0;

    m[0] = 2.0 / (right - left);
    m[5] = 2.0 / (top - bottom)
    m[12] = -(right + left) / (right - left);
    m[13] = -(top + bottom) / (top - bottom);
    m[14] = -(farz + nearz) / (farz - nearz);
    m[15] = 1.0;
    return m;
}

/*

  Make a LookAt Matrix.

  Inspirated by
  http://www.cs.virginia.edu/~gfx/Courses/1999/intro.fall99.html/lookat.html

*/
this.MakeLookAt = function(v3Eye, v3Center, v3Up){

  var F = v3Center.sub(v3Eye).normalize();
  var U = v3Up.normalize();
  var S = F.cross(U).normalize();

  U = S.cross(F);

  var M = Matrix.Identity().set(S,  U, F.inverse());


  var negEye = v3Eye.inverse();

  return Transform.Apply(M).translate(negEye.getX(), negEye.getY(), negEye.getZ(),1).getMatrixObject();
};

/*
  Perspective
*/

this.MakePerspective = function(fieldOfView, aspectRatio, nearZ, farZ){
  var M = Matrix.Identity();
  var cotan = 1.0 / Math.tan(fieldOfView / 2.0);
  return M.set(
    Vec4.New(cotan/aspectRatio),
    Vec4.New(0.0, cotan),
    Vec4.New(0.0,0.0,( (farZ + nearZ) / (nearZ - farZ)), ( (2.0 * farZ * nearZ) / (nearZ - farZ)) ),
    Vec4.New(0.0,0.0,-1.0,0.0)
   );
};

};

module.exports = Camera;
