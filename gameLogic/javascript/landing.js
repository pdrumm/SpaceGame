db = firebase.database();

/*
If game-in-progress==true then wait
else create a new player
 */
var gameInProgress, playerId;

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
                db.ref().set({
                    astronauts: {
                        1: true
                    }
                })
            } else {
                var max = 0;
                for (var i in root['astronauts']) {
                    i = parseInt(i);
                    max = i > max ? i : max;
                }
                // You are player i+1
                playerId = i+1;
                db.ref('astronauts').child(playerId).set(true);
                console.log("You are player " + playerId);
            }
        })
    }
});

player = db.ref('astronauts/undefined');
player.onDisconnect().remove();
