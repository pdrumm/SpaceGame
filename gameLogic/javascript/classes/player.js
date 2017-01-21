class Player {

  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.color = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);;

    this.gravity = .001;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.lastTime = Date.now();
  }

  update(bricks, keys) {
    var timeStep = Date.now() - this.lastTime;

    this.ySpeed = this.ySpeed + timeStep * this.gravity;
    var nextTop = this.top + timeStep * this.ySpeed;

    for (var i = 0; i < bricks.length; i++) {
      var brick = bricks[i];
      if (this.intersects(nextTop, nextTop + this.height, brick.getTop(), brick.getTop() + brick.getHeight())) {
        if (this.intersects(this.left, this.left + this.width, brick.getLeft(), brick.getLeft() + brick.getWidth())) {
          nextTop = brick.getTop() - this.height;
          this.ySpeed = 0;
        }
      }
    }

    if (keys.includes("d")) {
      this.xSpeed = .2;
    } else if (keys.includes("a")) {
      this.xSpeed = -.2;
    } else {
      this.xSpeed = 0;
    }
    var nextLeft = this.left + timeStep * this.xSpeed;

    if (keys.includes("w")) {
      this.ySpeed = -.2;
    }

    this.top = nextTop;
    this.left = nextLeft;
    this.lastTime = Date.now();
  }

  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.left, this.top, this.width, this.height);
  }

  intersects(a1, a2, b1, b2) {
    if (a2 < b1) {
      return false;
    }
    if (a1 > b2) {
      return false;
    }

    return true;
  }

  getLeft() {
    return this.left;
  }

  getTop() {
    return this.top;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }
}
