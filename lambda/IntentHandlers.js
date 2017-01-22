//var PlayerCountIntent = require("./intents/PlayerCount");
//var SelectPokemonIntent = require("./intents/SelectPokemon");
//var AttackIntent = require("./intents/Attack");

var OxygenRefillIntent = require("./intents/OxygenRefill");
var SonicBoomIntent = require("./intents/SonicBoom");

var registerIntentHandlers = function (intentHandlers) {
    intentHandlers.OxygenRefill = OxygenRefillIntent;
    intentHandlers.SonicBoom = SonicBoomIntent;
};

module.exports.register = registerIntentHandlers;
