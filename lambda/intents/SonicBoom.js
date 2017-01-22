var AlexaAssets = require("../AlexaAssets");

function handleSonicBoomRequest (intent, session, response) {

    this.db.ref('rocket/powers').update({'sonic-boom': true}).then(function() {
        response.tell(
            AlexaAssets.SonicBoom.speechOutput
        );
    });
}

module.exports = handleSonicBoomRequest;
