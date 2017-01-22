var AlexaAssets = require("../AlexaAssets");

function handleOxygenRefillRequest (intent, session, response) {

    if (intent.slots.Player && intent.slots.Player.value) {

        this.db.ref('rocket/powers').update({'oxygen-refill': intent.slots.Player.value}).then(function() {
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

module.exports = handleOxygenRefillRequest;
