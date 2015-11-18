var Vec4 = require('./vector').Vec4;
var Mat4 = require('./matrix4');

/*
 * Degree to radian.
 */
function dgToRad(angle){
    return (angle*Math.PI) / 180;
};

var Transform = function(m) {
    var _m = m;
    var cos = Math.cos;
    var sin = Math.sin;

    this.translate = function(x, y, z) {
        _m.row1.w = x || 0.0;
        _m.row2.w = y || 0.0;
        _m.row3.w = z || 0.0;
        return this;
    };

    this.scale = function(x, y, z) {
        _m.row1.x = x || 0.0;
        _m.row2.y = y || 0.0;
        _m.row3.z = z || 0.0;
        return this;
    };

    this.rotateX = function(angle) {
        var tetha = dgToRad(angle);
        var _cos = cos(tetha);
        var _sin = sin(tetha);

        _m.row2.y =  _cos || 0.0;
        _m.row2.z = -_sin || 0.0; 

        _m.row3.y = _sin || 0.0;
        _m.row3.z = _cos || 0.0;

        return this;
    };

    
    this.rotateY = function(angle){
        var tetha = dgToRad(angle);
        var _cos = cos(tetha);
        var _sin = sin(tetha);

        _m.row1.x =  _cos || 0.0;
        _m.row1.z =  _sin || 0.0; 

        _m.row3.x = -_sin || 0.0;
        _m.row3.z = _cos || 0.0;

        return this;
    };




    this.getMatrix = function(){
      return _m.getMatrix();
    };

    this.getMatrixObject = function(){
        return _m;
    }; 

};

module.exports = {
    Apply: function(m) {
        return new Transform(m);
    },
    New: function(){
      return new Transform( Mat4.Identity() );
    },
};
