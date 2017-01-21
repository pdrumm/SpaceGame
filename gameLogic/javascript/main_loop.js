CANVAS_WIDTH = 480;
CANVAS_HEIGHT = 480;

// creates a canvas element to be put in the html (idk why we are creating it but okay...)
this.canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
this.canvas = this.canvasElement.get(0).getContext("2d");
this.canvasElement.appendTo('body');
var gameEngine = new GameEngine(CANVAS_WIDTH, CANVAS_HEIGHT, canvas);
var FPS = 30;


document.addEventListener("keydown", function(event) {gameEngine.keyDownHandler(event);}, false);
document.addEventListener("keyup", function(event) {gameEngine.keyUpHandler(event);}, false);
document.addEventListener("mousedown", function(event) {gameEngine.mouseDownHandler(event);}, false);

setInterval(
  function() {
    gameEngine.update();
    gameEngine.draw();
  },
  1000/FPS);
