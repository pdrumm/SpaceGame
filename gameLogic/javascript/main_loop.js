CANVAS_WIDTH = 1000;
CANVAS_HEIGHT = 600;
var ASTRONAUT_ID = 1;
var ASTEROID_TYPE = 3;

// creates a canvas element to be put in the html (idk why we are creating it but okay...)
this.canvasElement = $("<canvas class=\"noBorders\"width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
this.canvas = this.canvasElement.get(0).getContext("2d");
this.canvasElement.appendTo('#canvasDiv');
var gameEngine = new GameEngine(CANVAS_WIDTH, CANVAS_HEIGHT, canvas);
var FPS = 30;

//Listen from DB to space
var astronautRef = firebase.database().ref('/astronauts/');

astronautRef.on('child_changed', function(snapshot) {
  //console.log(snapshot.val());
  //console.log(snapshot.key);
	// if snapshot.key != ME
	// 	update Astronaut
	
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
