(function (global) {
  let module = (global.L = { ...global.L });

  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");

  // Event Listeners
  module.mouseX = 0;
  module.mouseY = 0;

  addEventListener("mousemove", (e) => {
    module.mouseX = e.clientX;
    module.mouseY = e.clientY;
  });

  module.pressedKeys = [];

  addEventListener("keydown", (e) => {
    let key = e.key.toLocaleUpperCase();
    if (!module.pressedKeys.find((el) => el === key)) module.pressedKeys.push(key);
  });

  addEventListener("keyup", (e) => {
    let key = e.key.toLocaleUpperCase();
    module.pressedKeys = module.pressedKeys.filter((el) => el !== key);
  });

  // Canvas manipulation

  module.centerCanvas = () => {
    module.reCenterCanvas();
    addEventListener("resize", () => {
      // Sets canvas' position according to the window
      module.reCenterCanvas();
    });
  };

  module.reCenterCanvas = () => {
    canvas.style.top = `${(innerHeight - canvas.height) / 2}px`;
    canvas.style.left = `${(innerWidth - canvas.width) / 2}px`;
  };

  module.width = 0;
  module.height = 0;

  module.setCanvasSize = (inputWidth, inputHeight) => {
    canvas.width = inputWidth;
    canvas.height = inputHeight;

    module.width = inputWidth;
    module.height = inputHeight;
  };

  let translatedX = 0;
  let translatedY = 0;

  module.translate = (x, y) => {
    translatedX += x;
    translatedY += y;
    ctx.translate(x, y);
  };

  module.background = (color = "white") => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Animation manipulation

  let NO_LOOP = false;

  module.noLoop = () => {
    NO_LOOP = true;
  };

  let FPS = 60;

  module.frameRate = (fps) => {
    FPS = fps;
  };

  let REAL_FPS = FPS;

  module.getFrameRate = () => {
    return REAL_FPS;
  };

  // Drawing styles

  let NO_STROKE = false;
  let NO_FILL = false;

  module.strokeWeight = (weight) => {
    ctx.lineWidth = weight;
    NO_STROKE = false;
  };

  module.stroke = (color = "white") => {
    ctx.strokeStyle = color;
    NO_STROKE = false;
  };

  module.fill = (color = "white") => {
    ctx.fillStyle = color;
    NO_FILL = false;
  };

  module.noFill = () => {
    NO_FILL = true;
  };

  module.noStroke = () => {
    NO_STROKE = true;
  };

  // Shapes

  module.Line = (x0, y0, x1, y1) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    if (!NO_STROKE) ctx.stroke();
    else ctx.fill();
    ctx.closePath();
  };

  module.Ellipse = (x, y, size1, size2 = size1) => {
    ctx.beginPath();
    ctx.ellipse(x, y, size1 / 2, size2 / 2, 0, 0, 2 * Math.PI);
    if (!NO_FILL) ctx.fill();
    else ctx.stroke();
    ctx.closePath();
  };

  module.Rectangle = (x, y, width, height) => {
    ctx.rect(x, y, width, height);
    if (!NO_FILL) ctx.fill();
    else ctx.stroke();
    ctx.closePath();
  };

  let FIRST_VERTEX = false;

  module.beginShape = () => {
    FIRST_VERTEX = true;
    ctx.beginPath();
  };

  module.endShape = () => {
    if (!NO_FILL) ctx.fill();
    else ctx.stroke();
    ctx.closePath();
  };

  module.Vertex = (x, y) => {
    if (FIRST_VERTEX) {
      FIRST_VERTEX = false;
      ctx.moveTo(x, y);
    } else ctx.lineTo(x, y);
  };

  // Animation Loop
  function START_LOOP() {
    let startTime = new Date();
    setTimeout(() => {
      draw();
      module.translate(-translatedX, -translatedY);
      if (!NO_LOOP) {
        let endTime = new Date();
        let timeDifference = (endTime - startTime) / 1000;
        REAL_FPS = 1 / timeDifference;
        requestAnimationFrame(START_LOOP); // Create an animation loop
      }
    }, 1000 / FPS);
  }

  addEventListener("DOMContentLoaded", () => {
    setup();
    START_LOOP();
  });
})(this);
