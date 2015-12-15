'use strict';

var vec3 = function(x, y, z) {

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
        return new vec3(this.x, this.y, this.z );
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
        var tmp = new vec3(
            this.x / m,
            this.y / m,
            this.z / m);

        return tmp;
    };

    this.norm = function() {
        var m = this.magnitude();
        var tmp = new vec3(
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
        return new vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    };

    this.cross = function(v) {
        return new vec3((this.y * v.z - this.z * v.y), (this.z * v.x - this.x * v.z), (this.x * v.y - this.y * v.x));
    };

    this.copy = function() {
        return new vec3(this.x, this.y, this.z);
    };

    this.project = function(b) {
        var ab = this.dot(b);
        var proj = ab / b.magnitude();
        var vnorm = b.normalize();
        return vnorm.multiplyByScalar(proj);
    };
};


var LerpFn = {

    Lerp: function(v0, v1, t) {
        return v0.scalar_mul(1.0 - t).add(v1.multiplyByScalar(t));
    },

    CosLerp: function(v0, v1, t) {
        var ft = t * Math.PI;
        var f = (1 - Math.cos(ft)) * .5;
        return v0.scalar_mul(1.0 - f).add(v1.multiplyByScalar(f));
    },
}


module.exports = vec3;
