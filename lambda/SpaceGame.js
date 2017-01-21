var AlexaSkill = require("./AlexaSkill");
var eventHandlers = require("./EventHandlers");
var intentHandlers = require("./IntentHandlers");

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.94c25382-e9d2-4825-a57e-48585a52ee1d";

/*
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGame inherits from AlexaSkill.
 */
var SpaceGame = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGame.prototype = Object.create(AlexaSkill.prototype);
SpaceGame.prototype.constructor = SpaceGame;

// Register Event Handlers
eventHandlers.register(SpaceGame.prototype.eventHandlers);

// Register Intent Handlers
intentHandlers.register(SpaceGame.prototype.intentHandlers);


module.exports = SpaceGame;
