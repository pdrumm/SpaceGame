class GameEngine {

  constructor(width, height, canvas) {
    this.CANVAS_WIDTH = width; //window.innerWidth;
    this.CANVAS_HEIGHT = height - 40; // window.innerHeight;
    this.canvas = canvas;
    this.init();
  }

  // initializes the game
  // this is separate from the constructor
  init() {
    this.rocket = new Rocket(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2, 50, 100);
    setRocket(null, FULL_HEALTH);
    var astronautX = 0;
    if (ASTRONAUT_ID < 3) {
      astronautX = this.CANVAS_WIDTH / 2 - 50 * ASTRONAUT_ID - 100;
    } else {
      astronautX = this.CANVAS_WIDTH / 2 + 50 * ASTRONAUT_ID + 100;
    }
    this.astronaut = new Astronaut(astronautX, this.CANVAS_HEIGHT / 2, 20, 40, this.CANVAS_WIDTH, this.CANVAS_HEIGHT, ASTRONAUT_ID);
    this.astronauts = {};
    setAstronauts(100, 100, this.astronaut.angle, ASTRONAUT_ID);
    this.asteroids = new Array();
    this.hammers = new Array();
    // the time when the last asteroid was created
    this.lastAsteroid = Date.now();
    // all keys that are currently being pressed down
    this.keys = new Array();
    // if the game is over
    this.gameOver = false;
    this.space = new Space(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    this.gettingOxygen = false;
    this.stats = new Stats(0, this.CANVAS_HEIGHT, this.CANVAS_WIDTH, 40);
    this.asteroidInterval = 2000;
    this.lastHammer = Date.now();
  }

  update() {
    this.space.update();
    // create a new asteroid after a certain amount of time
    if (Date.now() - this.lastAsteroid > this.asteroidInterval) {
      this.asteroids.push(HelperFunctions.createAsteroid(this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
      this.asteroidInterval = Math.random() * 2000 + 1000;
      this.lastAsteroid = Date.now();
    }
    // update astronaut
    this.astronaut.update(this.keys);
    updateAstronauts(this.astronaut.centerX, this.astronaut.centerY, this.astronaut.angle, ASTRONAUT_ID);
    // update asteroids
    for (var i = 0; i < this.asteroids.length; i++) {
      var remove = this.asteroids[i].update();
      // if asteroid is off screen
      if (remove) {
        this.destroyAsteroid(i);
        i += -1;
      }
    }
    // update hammers
    for (var i = 0; i < this.hammers.length; i++) {
      var remove = this.hammers[i].update();
      // if hammer is off screen
      if (remove) {
        this.destroyHammer(i);
        i += -1;
      }
    }
    if (this.astronaut.getOxygen() <= 0) {
        this.gameOver = true;
    }
    // check all collisions
    this.collisions();
  }

  // detects any collisions
  collisions() {
    // check all hammers
    for (var i = 0; i < this.hammers.length; i++) {
      var index = this.hammers[i].collideWithAsteroid(this.asteroids);
      // if a hammer collides with an asteroid
      if (index != -1) {
        // destroy hammer
        this.destroyHammer(i);
        // destroy asteroid
        this.destroyAsteroid(index);
        i += -1;
      }
    }
    // check if asteroid hits astronaut
    var dead = this.astronaut.collideWithAsteroid(this.asteroids);
    // kill astronaut
    if (dead != -1) {
      this.gameOver = true;
    }
    // check if asteroid hits rocket
    var crash = this.rocket.collideWithAsteroid(this.asteroids);
    // kill rocket
    if (crash != -1) {
      this.gameOver = true;
    }
  }

  startOxygen() {
    this.gettingOxygen = true;
    this.astronaut.startOxygen();
  }

  draw() {
    // resetting canvas
    this.canvas.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT + 40);
    this.canvas.fillStyle = "#C0E3C0";
    this.canvas.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT + 40);
    this.space.draw(this.canvas);
    // rocket
    this.rocket.draw(this.canvas);
    // astronaut
    this.astronaut.draw(this.canvas);
	  console.log("almost there");
    for (var i in this.astronauts) {
      console.log("iterate", this.astronauts[i], i);
	    this.astronauts[i].draw(this.canvas);
    }
    // asteroids
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.canvas);
    }
    // hammers
    for (var i = 0; i < this.hammers.length; i++) {
      this.hammers[i].draw(this.canvas);
    }
    this.stats.draw(this.canvas, this.astronaut.getOxygen());
    // game over screen
    if (this.gameOver) {
      canvas.fillStyle = "#000000";
      canvas.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT + 40);
      canvas.fillStyle = "#666666";
      canvas.textAlign = "center";
      canvas.font = "18px serif";
      canvas.fillText("Game Over :( Spacebar to play again", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
    }
  }

  // when a key is pressed down
  keyDownHandler(event) {
    var keyPressed = event.key.toLowerCase();
    if (!this.keys.includes(keyPressed)) {
        this.keys.push(keyPressed);
    }
  }

  // when a key is released
  keyUpHandler(event) {
    var keyPressed = event.key.toLowerCase();
    if(this.keys.includes(keyPressed)) {
      this.keys.splice(this.keys.indexOf(keyPressed), 1);
    }
    if (this.gameOver && keyPressed == " ") {
      this.init();
    } else if (keyPressed == " ") {
      this.startOxygen();
    } else if (keyPressed == "o") { // FULL SCREEN STUFF
      if (
      	document.fullscreenEnabled ||
      	document.webkitFullscreenEnabled ||
      	document.mozFullScreenEnabled ||
      	document.msFullscreenEnabled
      ) {
        // if we are full screen
        if (
        	document.fullscreenElement ||
        	document.webkitFullscreenElement ||
        	document.mozFullScreenElement ||
        	document.msFullscreenElement
        ) {
          // exit full-screen
          if (document.exitFullscreen) {
          	document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
          	document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
          	document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
          	document.msExitFullscreen();
          }
        } else {
          var i = document.getElementById("canvasDiv");
          // go full-screen
          if (i.requestFullscreen) {
          	i.requestFullscreen();
          } else if (i.webkitRequestFullscreen) {
          	i.webkitRequestFullscreen();
          } else if (i.mozRequestFullScreen) {
          	i.mozRequestFullScreen();
          } else if (i.msRequestFullscreen) {
          	i.msRequestFullscreen();
          }
        }
      }
    }
  }

  destroyAsteroid(index) {
    removeAsteroid(this.asteroids[index].getAsteroidId());
    this.asteroids.splice(index, 1);
  }

  destroyHammer(index) {
    removeHammer(this.hammers[index].getHammerId());
    this.hammers.splice(index, 1);
  }

  // when the mouse is clicked
  mouseDownHandler(event) {
    // handles full screen mode
    if (Date.now() - this.lastHammer > 500) {
      var rect = document.getElementById("canvasDiv").getBoundingClientRect();
      this.hammers.push(HelperFunctions.createHammer(event.pageX - rect.left, event.pageY - rect.top, this.astronaut.getCenterX(), this.astronaut.getCenterY(), this.CANVAS_WIDTH, this.CANVAS_HEIGHT));
      this.lastHammer = Date.now();
    }
  }
}
