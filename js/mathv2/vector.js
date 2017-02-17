'use strict';

var Vector3 = function(x, y, z) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;

    this.setX = function(n) {
        this.x = n;
        return this;
    };

    this.setY = function(n) {
        this.y = n;
        return this;
    };

    this.setZ = function(n) {
        this.z = n;
        return this;
    };

    this.getX = function() {
        return this.x;
    };

    this.getY = function() {
        return this.y;
    };

    this.getZ = function() {
        return this.z;
    };

    this.copy = function() {
        return new Vector3(this.x, this.y, this.z );
    };

    this.setValues = function(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    };

    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    };

    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };

    this.dot = function(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    };

    this.inverse = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    };

    this.magnitude = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.normalize = function() {
        var m = this.magnitude();
        var tmp = new Vector3(
            this.x / m,
            this.y / m,
            this.z / m);

        return tmp;
    };

    this.norm = function() {
        var m = this.magnitude();
        var tmp = new Vector3(
            this.x / m,
            this.y / m,
            this.z / m);

        return tmp;
    };

    this.scalarMultiply = function(e) {
        this.x *= e;
        this.y *= e;
        this.z *= e;
        return this;
    };

    this.multiplyByScalar = function(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    };

    this.cross = function(v) {
        return new Vector3((this.y * v.z - this.z * v.y), (this.z * v.x - this.x * v.z), (this.x * v.y - this.y * v.x));
    };

    this.copy = function() {
        return new Vector3(this.x, this.y, this.z);
    };

    this.project = function(b) {
        var ab = this.dot(b);
        var proj = ab / b.magnitude();
        var vnorm = b.normalize();
        return vnorm.multiplyByScalar(proj);
    };
};

var Vector4 = function(x, y, z, w) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
    this.w = w || 0.0;

    this.set = function(x, y, z, w) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.z = z || 0.0;
        this.w = w || 0.0;


    };


    this.copy = function() {
        return new Vector4(this.x, this.y, this.z, this.w);
    };


    this.dot = function(v) {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z) + (this.w * v.w);
    };


    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
    };

    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
    };
};


module.exports = {

    Vec3: {
        New: function(x, y, z) {
            return new Vector3(x, y, z);
        }
    },
    
    Vec4: {
        New: function(x, y, z, w) {
            return new Vector4(x, y, z, w);
        }
    }
};
