//var PlayerCountIntent = require("./intents/PlayerCount");
//var SelectPokemonIntent = require("./intents/SelectPokemon");
//var AttackIntent = require("./intents/Attack");

var HealthDropIntent = require("./intents/HealthDrop");

var registerIntentHandlers = function (intentHandlers) {
    intentHandlers.HealthDropIntent = HealthDropIntent;

    //intentHandlers.PlayerCountIntent = PlayerCountIntent;
    //intentHandlers.SelectPokemonIntent = SelectPokemonIntent;
    //intentHandlers.AttackIntent = AttackIntent;
};

module.exports.register = registerIntentHandlers;
