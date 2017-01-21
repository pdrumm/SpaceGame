//var PlayerCountIntent = require("./intents/PlayerCount");
//var SelectPokemonIntent = require("./intents/SelectPokemon");
//var AttackIntent = require("./intents/Attack");

var OxygenRefillIntent = require("./intents/OxygenRefill");

var registerIntentHandlers = function (intentHandlers) {
    intentHandlers.OxygenRefill = OxygenRefillIntent;

    //intentHandlers.PlayerCountIntent = PlayerCountIntent;
    //intentHandlers.SelectPokemonIntent = SelectPokemonIntent;
    //intentHandlers.AttackIntent = AttackIntent;
};

module.exports.register = registerIntentHandlers;
