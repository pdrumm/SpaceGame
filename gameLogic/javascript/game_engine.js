/*
  currently the global variables CANVAS_WIDTH and CANVAS_HEIGHT are being declared in main_loop.js
  however, I feel like it would be better to have them within game_engine.js,
  so maybe I will change that later
*/

class GameEngine {

  constructor(canvas) {
    this.canvas = canvas;
    this.init();
  }

  // initializes the game
  // this is separate from the constructor
  init() {
    this.rocket = new Rocket(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 50, 100);
    setRocket(null, FULL_HEALTH);
    var astronautX = 0;
    if (ASTRONAUT_ID < 3) {
      astronautX = CANVAS_WIDTH / 2 - 50 * ASTRONAUT_ID - 100;
    } else {
      astronautX = CANVAS_WIDTH / 2 + 50 * ASTRONAUT_ID + 100;
    }
    this.astronaut = new Astronaut(astronautX, CANVAS_HEIGHT / 2, 20, 40, ASTRONAUT_ID);
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
    this.space = new Space();
    this.gettingOxygen = false;
    this.stats = new Stats(0, CANVAS_HEIGHT - 40, CANVAS_WIDTH, 40);
    this.asteroidInterval = 2000;
    this.lastHammer = Date.now();
    this.sonicBoomTime = 0;
  }

  update() {
    this.space.update();
    // create a new asteroid after a certain amount of time
    if (Date.now() - this.lastAsteroid > this.asteroidInterval) {
      this.asteroids.push(HelperFunctions.createAsteroid(CANVAS_WIDTH, CANVAS_HEIGHT));
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
      console.log(this.hammers[i].astronautId);
      console.log(this.hammers[i].hammerId);
      // if hammer is off screen
      if (remove) {
        this.destroyHammer(i);
        i += -1;
      }
    }
    if (this.astronaut.getOxygen() <= 0) {
      this.gameOverTransition("Game's over - don't hold your breath :)");
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
      this.gameOverTransition("You got rocked - literally.")
    }
    // check if asteroid hits rocket
    var crash = this.rocket.collideWithAsteroid(this.asteroids);
    // kill rocket
    if (crash != -1) {
      this.gameOverTransition("Your Rocket ship was damaged beyond repair...");
    }
  }

  gameOverTransition(msg) {
    var url = "./gameover.html?msg="+msg;
    window.location.replace(url);
    window.location = url;
  }

  startOxygen() {
    this.gettingOxygen = true;
    this.astronaut.startOxygen();
  }

  endOxygen() {
    this.astronaut.endOxygen();
  }

  sonicBoom() {
    this.sonicBoomTime = Date.now();
    firebase.database().ref('asteroids').remove();
    this.asteroids = new Array();
  }

  draw() {
    // resetting canvas
    this.canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT + 40);
    this.canvas.fillStyle = "#C0E3C0";
    this.canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT + 40);
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
    if (Date.now() < this.sonicBoomTime + 3000) {
      if (Date.now() - this.sonicBoomTime < 200) {
        this.canvas.fillStyle = "rgba(255, 255, 255, " + (3000 - (Date.now() - this.sonicBoomTime)) / 3000 + ")";
      } else {
        this.canvas.fillStyle = "rgba(255, 255, 255, " + (3000 - (Date.now() - this.sonicBoomTime)) / 3000 + ")";
      }
      this.canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    this.stats.draw(this.canvas, this.astronaut.getOxygen());
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
    } else if (keyPressed == "u") {
      this.startOxygen();
    } else if (keyPressed == "y") {
      this.sonicBoom();
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
      this.hammers.push(HelperFunctions.createHammer(event.pageX - rect.left, event.pageY - rect.top, this.astronaut.getCenterX(), this.astronaut.getCenterY()));
      this.lastHammer = Date.now();
    }
  }
}
