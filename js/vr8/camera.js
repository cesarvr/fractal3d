'use strict'

var Factory = require('../utils/factory');
var Vec4  = require('../mathv2/vector').Vec4;
var Matrix  = require('../mathv2/matrix');


var Camera = function(){
};

Camera.prototype.MakeOrtho = function(left, right, bottom, top, nearz, farz) {
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
Camera.prototype.MakeLookAt = function(v3Eye, v3Center, v3Up){

  var F = v3Center.sub(v3Eye).normalize();
  var U = v3Up.normalize();
  var S = F.cross(U).normalize();
  U = S.cross(F);

  var M = Matrix.Set(S,  U, F.inverse());


  var negEye = v3Eye.inverse();
  var T = Matrix
          .Identity()
          .set(
            Vec4.New(1,0,0,negEye.getX()),
            Vec4.New(0,1,0,negEye.getY()),
            Vec4.New(0,0,1,negEye.getZ())
          );

  return M.multiply(T);
};

module.exports = new Factory(Camera);
