var SpaceGame = require("./SpaceGame");
var firebase = require('./FirebaseDB');

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    context.callbackWaitsForEmptyEventLoop = false;
    // Create an instance of the SpaceGame skill.
    var spacegame = new SpaceGame();
    spacegame.db = firebase.db;
    spacegame.execute(event, context);
};
