CANVAS_WIDTH = 1000;
CANVAS_HEIGHT = 600;
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
var GAME_ID = getParameterByName("gid");
var GAME_REF = firebase.database().ref('liveGames').child(GAME_ID);

// Remove the player when they leave the game
playerRef = GAME_REF.child('astronauts').child(ASTRONAUT_ID);
playerRef.onDisconnect().remove();

// creates a canvas element to be put in the html (idk why we are creating it but okay...)
this.canvasElement = $("<canvas class=\"noBorders\"width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
this.canvas = this.canvasElement.get(0).getContext("2d");
this.canvasElement.appendTo('#canvasDiv');
var gameEngine = new GameEngine(CANVAS_WIDTH, CANVAS_HEIGHT, canvas);
var FPS = 30;

//Listen from DB to space
var astronautRef = GAME_REF.child('astronauts');
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
	  CANVAS_WIDTH,
	  CANVAS_HEIGHT,
	  snapshot.key
      )
    }
});

var hammerRef = GAME_REF.child('hammers');
hammerRef.on('child_added', function(snapshot){
  gameEngine.hammers.push(new Hammer(
	  snapshot.val()["centerX"],
	  snapshot.val()["centerY"],
	  CANVAS_WIDTH,
	  CANVAS_HEIGHT,
	  snapshot.val()["angle"],
	  snapshot.val()["astronautId"],
	  snapshot.val()["startTime"],
	  snapshot.val()["hammerId"])
  );
});

var asteroidRef = GAME_REF.child('asteroids');
asteroidRef.on('child_added', function(snapshot){
  gameEngine.asteroids.push(new Asteroid(
	  snapshot.val()["centerX"],
	  snapshot.val()["centerY"],
	  snapshot.val()["size"],
	  snapshot.val()["speed"],
	  CANVAS_WIDTH,
	  CANVAS_HEIGHT,
	  snapshot.val()["angle"],
	  snapshot.val()["astronautId"],
	  snapshot.val()["startTime"],
	  snapshot.val()["type"],
	  snapshot.val()["asteroidId"]
  ));
});

GAME_REF.child('rocket/powers/oxygen-refill').on('value', function(snapshot) {
    if (snapshot.val() < 1) {
      return;
    } else if(ASTRONAUT_ID == snapshot.val()) {
      gameEngine.startOxygen();
    } else {
      gameEngine.endOxygen();
    }
    GAME_REF.child('rocket/powers/oxygen-refill').set(-1);
});

GAME_REF.child('rocket/powers/sonic-boom').on('value', function(snapshot) {
    if (snapshot.val() == true) {
      gameEngine.sonicBoom();
      GAME_REF.child('rocket/powers/sonic-boom').set(false);
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
