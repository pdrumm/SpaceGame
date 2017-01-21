var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDtCZUS5NAPYBpDL3Rpcits9WJUvY51vbQ",
    authDomain: "spacegame-3b8f2.firebaseapp.com",
    databaseURL: "https://spacegame-3b8f2.firebaseio.com",
    storageBucket: "spacegame-3b8f2.appspot.com",
    messagingSenderId: "188472341396"
};
firebase.initializeApp(config);

var db = firebase.database();
module.exports.db = db;
