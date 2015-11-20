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

    that.setGeometry = function(m){
        var color = Vec4.New(0.8, 0.8, 0.8, 1.0);

        that.geometry.push(new Point(m.row1, color, {u:0,v:1}));
        that.geometry.push(new Point(m.row2, color, {u:1,v:1}));
        that.geometry.push(new Point(m.row3, color, {u:1,v:0}));

    };


    that.rotx = function(m){
    
        return m 
    };



    that.plane = function(width, height) {
        
      that.drawType = 'TRIANGLES';
      var m1 = Mat3.New();

      var rotx = Mat3.Identity();
      rotx.row2.setValues(0,0,-1);
      rotx.row3.setValues(0,1,0);
        

      var rfl = Mat3.Identity();
      rfl.row2.setValues(0,1,0);
      rfl.row3.setValues(0,0,-1);
     

      var roty = Mat3.Identity();
      roty.row1.setValues(0,0,1);
      roty.row3.setValues(-1,1,0);


      m1.row1.setValues(-1,1,0);
      m1.row2.setValues(0.0,1,0);
      m1.row3.setValues(0,0,0);


      m1.multiplyByScalar(5);      

      that.setGeometry(m1);


      that.setGeometry(m1.multiply(rfl));
      that.setGeometry(m1.multiply(rfl));
      //that.setGeometry(roty.multiply(m1));
      //that.setGeometry(m1.multiply(roty));
     // that.setGeometry(m1.multiply(rotx));
/*
       m1.multiply(roty); 
    
        that.setGeometry(m1);

        m1.multiply(roty); 
    
        that.setGeometry(m1);
 
        
        m1.multiply(roty); 


    
        that.setGeometry(m1);

*/

        return that;
    };

    that.getDrawType = function() {
        return that.drawType;
    };

    return that;
};

module.exports = new Factory(Poly);
