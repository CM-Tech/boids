function Vec(x, y) {
    this.x = x;
    this.y = y;
}
Vec.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
};
Vec.prototype.sub = function(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
};
Vec.prototype.dist = function(other) {
    return Math.sqrt(this.distSquare(other));
};
Vec.prototype.distSquare = function(other) {
    return (Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
};
Vec.prototype.copy = function() {
    return new Vec(this.x, this.y);
};
Vec.prototype.lengt = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};
Vec.prototype.normalize = function() {
    var len = this.lengt();
    this.x /= len;
    this.y /= len;
    return this;
};
Vec.prototype.div = function(o) {
    this.x /= o;
    this.y /= o;
    return this;
};
Vec.prototype.mult = function(o) {
    this.x *= o;
    this.y *= o;
    return this;
};

Vec.prototype.setMag = function(mag) {
    this.normalize();
    this.mult(mag);
    return this;
};
Vec.prototype.limit = function(max) {
    this.setMag(Math.min(this.lengt(), max));
    return this;
};