db = firebase.database();

var gameInProgress, playerId;
var playerList=[], readyList=[];

/*
Add a listener for any player changes
 */
db.ref('astronauts').on('child_added', function(snapshot) {
    $("#p"+snapshot.key+" > span").addClass('online');
    playerList.push(snapshot.key);
});

/*
If game-in-progress==true then wait
else create a new player
 */

// Determine whether or not there is a game in progress
db.ref().once('value', function(snapshot) {
    var root = snapshot.val();
    if (root['game-in-progress']===false) {
        gameInProgress = false;
    } else if (!root['astronauts']) {
        gameInProgress = false;
        db.ref('game-in-progress').set(false);
    } else {
        gameInProgress = true;
    }
}).then(function() {
    if (gameInProgress) {
        console.log("Please wait");
    } else {
        // If a game is not in progress, then this player will join the game
        console.log("Welcome");
        // Get the last player
        db.ref().once('value', function(snapshot) {
            var root = snapshot.val();
            if (!root['astronauts']) {
                // No astronauts exist, you are player one
                playerId = 1;
                db.ref().update({
                    astronauts: {
                        1: true
                    }
                });
                db.ref('ready-players').set({
                    1: false, 2: false, 3: false, 4: false
                });
            } else {
                var max = 0;
                for (var i in root['astronauts']) {
                    i = parseInt(i);
                    max = i > max ? i : max;
                }
                // You are player i+1
                playerId = i+1;
                localStorage['pid'] = playerId;
                db.ref('astronauts').child(playerId).set(true);
                console.log("You are player " + playerId);
            }
            $("#p"+playerId).addClass('myself');
        });
    }
});

// Used to change not-ready status to ready status of a given player
db.ref("ready-players").on("child_changed", function(snapshot) {
    var pid = snapshot.key;
    $("#r"+pid).addClass("readystatus");
    $("#r"+pid).removeClass("notreadystatus");
    $("#r"+pid).text("Ready");
    readyList.push(pid);

    // determine if all players are ready
    if (playerList.length===readyList.length) {
        beginGame();
    }
});

$(document).ready(function() {
    $("#readybtn").click(function(){
        db.ref("ready-players").child(playerId).set(true);
    });
});

// Redirect user to the game-play page
function beginGame() {
    db.ref('game-in-progress').set(true).then(function(){
        var url = "file:///C:/Users/Patrick/Documents/boilermake/SpaceGame/gameLogic/index.html?pid="+playerId;
        window.location.replace(url);
        window.location = url;
    });
}

// Add this code to the game-play page
//player = db.ref('astronauts/undefined');
//player.onDisconnect().remove();
