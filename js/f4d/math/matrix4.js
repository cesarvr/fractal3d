var Vec3 = require('./vector3');
var Vec4 = require('./vector4');


/*
 * [ 0 4  8 12 ]   [ 0 4  8 12 ]
 * [ 1 5  9 13 ] x [ 1 5  9 13 ]
 * [ 2 6 10 14 ]   [ 2 6 10 14 ]
 * [ 3 7 11 15 ]   [ 3 7 11 15 ]
 *
 *
 * */

var Matrix4 = function() {

    var mtx4 = null;

    this.row1 = new Vec4();
    this.row2 = new Vec4();
    this.row3 = new Vec4();
    this.row4 = new Vec4();

    /*
     * [ 0 4  8 12 ]
     * [ 1 5  9 13 ]
     * [ 2 6 10 14 ]
     * [ 3 7 11 15 ]
     *
     * */

    this.getMatrix = function() {

        if (mtx4 === null) {
            mtx4 = new Float32Array(16);
        };

        mtx4.set([
            this.row1.x, this.row2.x, this.row3.x, this.row4.x,
            this.row1.y, this.row2.y, this.row3.y, this.row4.y,
            this.row1.z, this.row2.z, this.row3.z, this.row4.z,
            this.row1.w, this.row2.w, this.row3.w, this.row4.w
        ]);

        return mtx4;
    };

    this.setIdentity = function() {
        this.row1 = new Vec4(1.0, 0.0, 0.0, 0.0);
        this.row2 = new Vec4(0.0, 1.0, 0.0, 0.0);
        this.row3 = new Vec4(0.0, 0.0, 1.0, 0.0);
        this.row4 = new Vec4(0.0, 0.0, 0.0, 1.0);

        return this;
    };

    this.setMatrix = function(m) {
        this.row1 = m.row1;
        this.row2 = m.row2;
        this.row3 = m.row3;
        this.row4 = m.row4;

        return this;
    };

    this.set = function(r1, r2, r3, r4) {
        this.row1 = r1 || this.row1;
        this.row2 = r2 || this.row2;
        this.row3 = r3 || this.row3;
        this.row4 = r4 || this.row4;
        return this;
    };

    this.getTransponse = function() {
        var mtx = new Matrix4();
        mtx.row1.set(this.row1.x, this.row2.x, this.row3.x, this.row4.x);
        mtx.row2.set(this.row1.y, this.row2.y, this.row3.y, this.row4.y);
        mtx.row3.set(this.row1.z, this.row2.z, this.row3.z, this.row4.z);
        mtx.row4.set(this.row1.w, this.row2.w, this.row3.w, this.row4.w);
        return mtx;
    };

    this.copy = function() {
        return new MatrixFactory.Set(this.row1.copy(), this.row2.copy(), this.row3.copy(), this.row4.copy());
    };

    this.multiply = function(m) {
        var mtx = new Matrix4();
        var rhs = m.getTransponse();

        mtx.row1.set(
            this.row1.dot(rhs.row1),
            this.row1.dot(rhs.row2),
            this.row1.dot(rhs.row3),
            this.row1.dot(rhs.row4));

        mtx.row2.set(
            this.row2.dot(rhs.row1),
            this.row2.dot(rhs.row2),
            this.row2.dot(rhs.row3),
            this.row2.dot(rhs.row4));

        mtx.row3.set(
            this.row3.dot(rhs.row1),
            this.row3.dot(rhs.row2),
            this.row3.dot(rhs.row3),
            this.row3.dot(rhs.row4));

        mtx.row4.set(
            this.row4.dot(rhs.row1),
            this.row4.dot(rhs.row2),
            this.row4.dot(rhs.row3),
            this.row4.dot(rhs.row4));

        return this.setMatrix(mtx);
    };
};


module.exports = Matrix4;
