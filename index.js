let flock = [];

function setup() {
  L.setCanvasSize(1800, 900);
  L.centerCanvas();
  for (let i = 0; i < 300; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  L.background(`rgb(51, 51, 51)`);

  let unchangedFlock = [...flock];
  for (let boid of flock) {
    boid.edges();
    boid.flock(unchangedFlock);
    boid.update();
    boid.show();
  }
}
