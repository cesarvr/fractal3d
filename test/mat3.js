var assert = require('assert');
var Matrix = require('../js/mathv2/matrix3');
var assert = require('chai').assert;

describe('Mat3', function() {

    it('checking the packages', function() {
      assert.isObject(Matrix, 'Matrix is an object');
      assert.isFunction(Matrix.New, 'Matrix is an function');
      assert.isFunction(Matrix.Identity, 'Matrix is an function');
    });
  
    it('Identity Matrix', function() {
      var m = Matrix.Identity();
      assert.isObject(m, 'Matrix is an object');
        
        var a = m.row1;
        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 1');
    });

    it('Zero Matrix', function() {
      var m = Matrix.New();
      assert.isObject(m, 'Matrix is an object');
        
        var a = m.row1;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');

    });

    it('Mat3 # set', function() {
    
      var m = Matrix.New();
      console.log('->', m);
      assert.isObject(m, 'Matrix is an object');


      assert.isUndefined(m.row1, 'should be a vector');
      assert.isUndefined(m.row2, 'should be a vector');
      assert.isUndefined(m.row3, 'should be a vector');

      m.row1.set(1,0,0);
      m.row2.set(0,1,0);
      m.row3.set(0,0,1);

        var a = m.row1;

      
        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 0');
 

    });


    it('transponse Matrix', function() {
      var m = Matrix.Identity().getTransponse();
      assert.isObject(m, 'Matrix is an object');

        var a = m.row1;

        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
 
        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
 
        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 1');
 
        var a = m.row4;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
    });

  
    function p(m){
    
        console.log('matrix->');

        var a = m.row1;
        console.log(a.x , a.y, a.z, a.w);

        var a = m.row2;
        console.log(a.x , a.y, a.z, a.w);
      
        var a = m.row3;
        console.log(a.x , a.y, a.z, a.w);

    }

    
    function pmtx(m){
        console.log('Matrix : Debug');

        console.log(m);
        console.log(m[0], m[4], m[8], m[12]  );
        console.log(m[1], m[5], m[9], m[13] );
        console.log(m[2], m[6], m[10], m[14]);
        console.log(m[3], m[7], m[11], m[15]);

    }




    it('Mat3 # multiply', function() {

    });


});
