var AlexaAssets = require("../AlexaAssets");

function handlePlayerCountRequest (intent, session, response) {

    response.tell(
        AlexaAssets.HealthDrop.speechOutput
    );

}

module.exports = handlePlayerCountRequest;
