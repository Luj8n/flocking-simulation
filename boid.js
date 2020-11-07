class Boid {
  constructor() {
    this.position = L.createVector2D(L.random(L.width), L.random(L.height));
    // this.position = L.createVector2D(L.width / 2, L.height / 2);
    this.velocity = L.Vector2D.random2D().setMag(L.random(2, 4));
    this.acceleration = L.createVector2D();
    this.maxForce = 1;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.position.x > L.width) {
      this.position.setPos(0, this.position.y);
    } else if (this.position.x < 0) {
      this.position.setPos(L.width, this.position.y);
    }
    if (this.position.y > L.width) {
      this.position.setPos(this.position.x, 0);
    } else if (this.position.y < 0) {
      this.position.setPos(this.position.x, L.width);
    }
  }

  align(boids) {
    let perceptionRadius = 50;
    let steering = L.createVector2D();
    let closeBoids = 0;
    for (let other of boids) {
      let distance = L.Vector2D.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (distance <= perceptionRadius && other != this) {
        steering.add(other.velocity);
        closeBoids++;
      }
    }
    if (closeBoids > 0) {
      steering.div(closeBoids);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = L.createVector2D();
    let closeBoids = 0;
    for (let other of boids) {
      let distance = L.Vector2D.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (distance <= perceptionRadius && other != this) {
        steering.add(other.position);
        closeBoids++;
      }
    }
    if (closeBoids > 0) {
      steering.div(closeBoids);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius = 50;
    let steering = L.createVector2D();
    let closeBoids = 0;
    for (let other of boids) {
      let distance = L.Vector2D.dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if (distance <= perceptionRadius && other != this) {
        let difference = L.Vector2D.sub(this.position, other.position);
        difference.div(distance * distance);
        steering.add(difference);
        closeBoids++;
      }
    }
    if (closeBoids > 0) {
      steering.div(closeBoids);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration = L.createVector2D();
  }

  show() {
    L.fill("white");
    L.Ellipse(this.position.x, this.position.y, 8);
  }
}
