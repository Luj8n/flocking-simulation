(function (global) {
  let module = (global.L = { ...global.L });

  module.Vector2D = class Vector2D {
    constructor(
      magnitude = 1,
      direction = 0,
      x = Math.cos(direction) * magnitude,
      y = Math.sin(direction) * magnitude
    ) {
      this.magnitude = magnitude;
      this.direction = direction;
      this.x = x;
      this.y = y;
      this.max = Infinity;
    }
    reCalculatePos() {
      this.x = Math.cos(this.direction) * this.magnitude;
      this.y = Math.sin(this.direction) * this.magnitude;
    }
    reCalculateMag() {
      let tempVector2D = module.createVector2D(this.x, this.y);
      this.magnitude = tempVector2D.magnitude;
    }
    reCalculateDir() {
      let tempVector2D = module.createVector2D(this.x, this.y);
      this.direction = tempVector2D.direction;
    }
    setPos(newX, newY) {
      this.x = newX;
      this.y = newY;
      this.reCalculateMag();
      this.reCalculateDir();
    }
    limit(max) {
      if (max) {
        this.max = max;
        if (this.magnitude > this.max) {
          this.setMag(this.max);
          this.reCalculatePos();
        }
      }
      return this;
    }
    setMag(mag) {
      if (mag) {
        if (mag > this.max) {
          this.magnitude = this.max;
          console.log("The new magnitude is more than the limit, set to the limit");
        } else {
          this.magnitude = mag;
        }
        this.reCalculatePos();
      }
      return this;
    }
    add(anotherVector2D) {
      this.x += anotherVector2D.x;
      this.y += anotherVector2D.y;
      this.reCalculateMag();
      this.reCalculateDir();
      this.limit(this.max);
      return this;
    }
    static add(vector1, vector2) {
      return module.createVector2D(vector1.x + vector2.x, vector1.y + vector2.y);
    }
    sub(anotherVector2D) {
      this.x -= anotherVector2D.x;
      this.y -= anotherVector2D.y;
      this.reCalculateMag();
      this.reCalculateDir();
      this.limit(this.max);
      return this;
    }
    static sub(vector1, vector2) {
      return module.createVector2D(vector1.x - vector2.x, vector1.y - vector2.y);
    }
    mult(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.reCalculateMag();
      this.reCalculateDir();
      this.limit(this.max);
      return this;
    }
    div(scalar) {
      if (scalar === 0) {
        console.log("Can't devide by zero");
      } else {
        this.x /= scalar;
        this.y /= scalar;
        this.reCalculateMag();
        this.reCalculateDir();
        this.limit(this.max);
      }
      return this;
    }
    normalize() {
      if (this.x === 0 && this.y === 0) {
        this.magnitude = 1;
      }
      this.x /= this.magnitude;
      this.y /= this.magnitude;
      this.magnitude = 1;
      return this;
    }
    rotate(angle) {
      this.direction = (this.direction + angle) % (Math.PI * 2);
      this.reCalculatePos();
      return this;
    }
    static random2D() {
      return this.fromAngle(Math.random() * Math.PI * 2);
    }
    static dist(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    static angleBetween(vector1, vector2) {
      return Math.abs(vector1.direction - vector2.direction);
    }
    static fromAngle(angle) {
      return new module.Vector2D(1, angle);
    }
  };

  module.createVector2D = (x = 0, y = 0) => {
    let mag = Math.sqrt(x * x + y * y);
    let dir = Math.atan(y / x);
    if (x >= 0 && y >= 0) {
      // first quadrant
    } else if (x <= 0 && y >= 0) {
      // second quadrant
      dir += Math.PI;
    } else if (x < 0 && y <= 0) {
      // third quadrant
      dir += Math.PI;
    } else if (x >= 0 && y <= 0) {
      // fourth quadrant
      dir += Math.PI * 2;
    }
    if (isNaN(dir)) dir = 0;
    return new module.Vector2D(mag, dir, x, y);
  };
})(this);
