'use strict';
var vec3 = require('./vector3');


var matrix3 = function() {

    var mtx = null;

    this.row1 = new vec3();
    this.row2 = new vec3();
    this.row3 = new vec3();

    /*
     * [ 0 3  6 ]
     * [ 1 4  7 ]
     * [ 2 5  8 ]
     *
     */

    this.getMatrix = function() {

        if (mtx === null) {
            mtx = new Float32Array(16);
        }
        mtx.set([
            this.row1.x, this.row2.x, this.row3.x,
            this.row1.y, this.row2.y, this.row3.y,
            this.row1.z, this.row2.z, this.row3.z
        ]);

        return mtx;
    };

    this.setIdentity = function() {
        this.row1 = new vec3(1.0, 0.0, 0.0);
        this.row2 = new vec3(0.0, 1.0, 0.0);
        this.row3 = new vec3(0.0, 0.0, 1.0);

        return this;
    };

    this.setMatrix = function(m) {
        this.row1 = m.row1;
        this.row2 = m.row2;
        this.row3 = m.row3;

        return this;
    };

    this.set = function(r1, r2, r3) {
        this.row1 = r1 || this.row1;
        this.row2 = r2 || this.row2;
        this.row3 = r3 || this.row3;

        return this;
    };

    this.copy = function() {
        return new matrix3().set(this.row1.copy(), this.row2.copy(), this.row3.copy());
    };

    this.multiplyByScalar = function(s) {
        this.row1.scalarMultiply(s);
        this.row2.scalarMultiply(s);
        this.row3.scalarMultiply(s);
    };

    this.getTransponse = function() {
        var mtx = new matrix3();
        mtx.row1.setValues(this.row1.x, this.row2.x, this.row3.x);
        mtx.row2.setValues(this.row1.y, this.row2.y, this.row3.y);
        mtx.row3.setValues(this.row1.z, this.row2.z, this.row3.z);
        return mtx;
    };

    this.multiply = function(m) {
        var mtx = new matrix3();
        var rhs = m.getTransponse();

        mtx.row1.setValues(
            this.row1.dot(rhs.row1),
            this.row1.dot(rhs.row2),
            this.row1.dot(rhs.row3));

        mtx.row2.setValues(
            this.row2.dot(rhs.row1),
            this.row2.dot(rhs.row2),
            this.row2.dot(rhs.row3));

        mtx.row3.setValues(
            this.row3.dot(rhs.row1),
            this.row3.dot(rhs.row2),
            this.row3.dot(rhs.row3));

        return this.setMatrix(mtx);
    };
};

module.exports = matrix3;
