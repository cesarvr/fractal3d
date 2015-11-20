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

      assert.isObject(m, 'Matrix is an object');



      m.row1.setValues(1,0,0);
      m.row2.setValues(0,1,0);
      m.row3.setValues(0,0,1);


        assert.isNotNull(m.row1, 'should be a vector');
        assert.isNotNull(m.row2, 'should be a vector');
        assert.isNotNull(m.row3, 'should be a vector');


        var a = m.row1;

        assert.strictEqual(a.x, 1, 'equal 1');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 0');

        var a = m.row2;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 1, 'equal 1');
        assert.strictEqual(a.z, 0, 'equal 0');

        var a = m.row3;
        assert.strictEqual(a.x, 0, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 1, 'equal 1 ');


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
    });


    function p(m){

        console.log('matrix->');

        var a = m.row1;
        console.log(a.x , a.y, a.z);

        var a = m.row2;
        console.log(a.x , a.y, a.z);

        var a = m.row3;
        console.log(a.x , a.y, a.z);

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
      var m1 = Matrix.New();
      var rotx = Matrix.Identity();

      m1.row1.setValues(1,1,0);
      m1.row2.setValues(1,0,0);
      m1.row3.setValues(-1,0,0);

      rotx.row2.setValues(0,0,-1);
      rotx.row3.setValues(0,1,0);

      m1.multiply(rotx);

      var a = m1.row1;

        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, -1, 'equal 1');

        var a = m1.row2;
        assert.strictEqual(a.x, 1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');

        var a = m1.row3;
        assert.strictEqual(a.x, -1, 'equal 0');
        assert.strictEqual(a.y, 0, 'equal 0');
        assert.strictEqual(a.z, 0, 'equal 1');
 

    });


});
