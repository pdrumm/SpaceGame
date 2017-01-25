let CANVAS_WIDTH = 1000;
let CANVAS_HEIGHT = 600;
var ASTEROID_TYPE = 3;
var FULL_HEALTH = 100;

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var ASTRONAUT_ID = getParameterByName("pid");

// Remove the player when they leave the game
playerRef = firebase.database().ref('astronauts').child(ASTRONAUT_ID);
playerRef.onDisconnect().remove();

// creates a canvas element to be put in the html (idk why we are creating it but okay...)
this.canvasElement = $("<canvas class=\"noBorders\"width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
this.canvas = this.canvasElement.get(0).getContext("2d");
this.canvasElement.appendTo('#canvasDiv');
var gameEngine = new GameEngine(canvas);
var FPS = 30;

//Listen from DB to space
var astronautRef = firebase.database().ref('/astronauts/');
astronautRef.on('child_changed', function(snapshot) {
  if (snapshot.key != ASTRONAUT_ID)
    {
      gameEngine.astronauts[snapshot.key].centerX = snapshot.val()["centerX"];
      gameEngine.astronauts[snapshot.key].centerY = snapshot.val()["centerY"];
      gameEngine.astronauts[snapshot.key].angle = snapshot.val()["angle"];
    }
      });

astronautRef.on('child_added', function(snapshot) {
  if (snapshot.key != ASTRONAUT_ID)
    {
	gameEngine.astronauts[snapshot.key] = new Astronaut(
	  snapshot.val()["centerX"],
	  snapshot.val()["centerY"],
	  20,
	  40,
	  snapshot.key
      )
    }
});

var hammerRef = firebase.database().ref('/hammers/');
hammerRef.on('child_added', function(snapshot){
  if (snapshot.val()["astronautId"] != ASTRONAUT_ID)
    {
    gameEngine.hammers.push(new Hammer(
  	  snapshot.val()["centerX"],
  	  snapshot.val()["centerY"],
  	  snapshot.val()["angle"],
  	  snapshot.val()["astronautId"],
  	  snapshot.val()["startTime"],
  	  snapshot.val()["hammerId"])
    );
  }
});

var asteroidRef = firebase.database().ref('/asteroids/');
asteroidRef.on('child_added', function(snapshot){
  if (snapshot.val()["astronautId"] != ASTRONAUT_ID)
    {
    gameEngine.asteroids.push(new Asteroid(
  	  snapshot.val()["centerX"],
  	  snapshot.val()["centerY"],
  	  snapshot.val()["size"],
  	  snapshot.val()["speed"],
  	  snapshot.val()["angle"],
  	  snapshot.val()["astronautId"],
  	  snapshot.val()["startTime"],
  	  snapshot.val()["type"],
  	  snapshot.val()["asteroidId"]
    ));
  }
});

firebase.database().ref('/rocket/powers/oxygen-refill').on('value', function(snapshot) {
    if (snapshot.val() < 1) {
      return;
    } else if(ASTRONAUT_ID == snapshot.val()) {
      gameEngine.startOxygen();
    } else {
      gameEngine.endOxygen();
    }
    firebase.database().ref('/rocket/powers/oxygen-refill').set(-1);
});

firebase.database().ref('/rocket/powers/sonic-boom').on('value', function(snapshot) {
    if (snapshot.val() == true) {
      gameEngine.sonicBoom();
      firebase.database().ref('/rocket/powers/sonic-boom').set(false);
    }
});

document.addEventListener("keydown", function(event) {gameEngine.keyDownHandler(event);}, false);
document.addEventListener("keyup", function(event) {gameEngine.keyUpHandler(event);}, false);
document.addEventListener("mousedown", function(event) {gameEngine.mouseDownHandler(event);}, false);

setInterval(
  function() {
    gameEngine.update();
    gameEngine.draw();
  },
  1000/FPS);
