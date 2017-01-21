var AlexaSkill = require("./AlexaSkill");
var eventHandlers = require("./EventHandlers");
var intentHandlers = require("./IntentHandlers");

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.448c9d95-9faa-4e4e-a017-44f39965b1e0";

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
