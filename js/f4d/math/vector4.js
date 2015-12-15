
var vec4 = function(x, y, z, w) {
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.z = z || 0.0;
    this.w = w || 0.0;

    this.set = function(x, y, z, w) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.z = z || 0.0;
        this.w = w || 0.0;


    }


    this.copy = function() {
        return new vec4(this.x, this.y, this.z, this.w);
    }


    this.dot = function(v) {
        return ((this.x * v.x) + (this.y * v.y) + (this.z * v.z) + (this.w * v.w));
    }


    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
    }

    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
    }
}

module.exports = vec4;
