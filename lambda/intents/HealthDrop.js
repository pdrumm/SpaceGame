var AlexaAssets = require("../AlexaAssets");

function handlePlayerCountRequest (intent, session, response) {

    //firebase.db.ref().once('value').then(function (snapshot) {
    //    console.log("READ:");
    //    console.log(snapshot.val());
    //}).then(function (success) {
    //    console.log("Success:");
    //    console.log(success);
    //}).catch(function (error) {
    //    console.log("Error: ");
    //    console.log(error);
    //});
    this.db.ref().child('health').set('truuuuu').then(function() {

        response.tell(
            AlexaAssets.HealthDrop.speechOutput
        );

    });

}

module.exports = handlePlayerCountRequest;
