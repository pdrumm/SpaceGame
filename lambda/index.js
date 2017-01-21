var SpaceGame = require("./SpaceGame");

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGame skill.
    var spacegame = new SpaceGame();
    spacegame.execute(event, context);
};
