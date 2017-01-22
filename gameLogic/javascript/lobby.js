db = firebase.database();

var gameInProgress, playerId;
var playerList=[], readyList=[];

/*
Add a listener for any player changes
 */
db.ref('player-count').on('value', function(snapshot) {
    $("#p"+snapshot.val()+" > span").addClass('online');
    playerList.push(snapshot.val());
    console.log(snapshot.val());
    console.log(snapshot.key);
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
        db.ref('player-count').set(0);
        db.ref('game-in-progress').set(false);
    } else {
        gameInProgress = true;
    }
}).then(function() {
    if (gameInProgress) {
        alert("A game is currently in progress. Please wait.");
    } else {
        // If a game is not in progress, then this player will join the game
        console.log("Welcome");
        // Get my player number (atomically)
        db.ref('player-count').transaction(function(currCount) {
          return currCount + 1;
        }, function(error, committed, snapshot) {
          if (error) {
            console.log("Transaction failed abnormally.");
          } else if (!committed) {
            console.log("We aborted the transaction.");
          } else {
            console.log("transaction successful");
          }
          playerId = snapshot.val();
        }).then(function(){

            if (playerId > 4) {
              alert("Sorry, the lobby is currently full.");
              return;
            } else if (playerId==1) {
              db.ref('ready-players').set({
                  1: false, 2: false, 3: false, 4: false
              });
            }

            console.log("You are player " + playerId);
            $("#p"+playerId).addClass('myself');
        }
      )
    }
});

// Used to change not-ready status to ready status of a given player
db.ref("ready-players").on("child_changed", function(snapshot) {
    if (snapshot.val()===false) { return; }

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
        var url = "./index.html?pid="+playerId;
        window.location.replace(url);
        window.location = url;
    });
}

// Add this code to the game-play page
//player = db.ref('astronauts/undefined');
//player.onDisconnect().remove();
