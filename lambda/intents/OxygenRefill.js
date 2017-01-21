var AlexaAssets = require("../AlexaAssets");

function handlePlayerCountRequest (intent, session, response) {

    if (intent.slots.Player && intent.slots.Player.value) {

        this.db.ref('rocket/powers').child('oxygen-refill').set(intent.slots.Player.value).then(function() {
            response.tell(
                AlexaAssets.OxygenRefill.speechOutput
            );
        });

    } else {
        response.ask(
            AlexaAssets.Error.speechOutput,
            AlexaAssets.Error.repromptOutput
        );
    }

}

module.exports = handlePlayerCountRequest;
