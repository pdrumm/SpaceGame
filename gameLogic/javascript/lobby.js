db = firebase.database();

var gameId, playerId;
var gameRef, playersListener;
var maxPlayers = 4;


/*
Add Firebase and JQuery event handlers
 */
function addLobbyListeners() {
  gameRef = db.ref('openGames').child(gameId);

  /*
  If the player disconnects, remove his records from the current game.
  If all players disconnect, then this game's tree in Firebase will be
  empty, so Firebase will automagically delete the game.
   */
  gameRef.child('playersReady').child(playerId).onDisconnect().remove();

  /*
   Add a listener for detecting new/exiting players and
   for detecting which players are ready. If all players
   in the room are ready then the game begins.
   */
  playersListener = gameRef.child('playersReady').on('value', function(snapshot) {
    var allPlayersReady = true;
    // Initialize list of empty players as list of all possible players
    var emptyPlayers = [];
    for (var i=1; i<=maxPlayers; ++i) {
      emptyPlayers.push(i);
    }
    // Loop through every player currently in the Lobby for this game
    for (var pid in snapshot.val()) {
      // Remove this player from the list of empty players
      pid = parseInt(pid);
      emptyPlayers.splice(emptyPlayers.indexOf(pid), 1);
      // Show that this player is online
      $("#p"+pid+" > span").addClass('online');
      // If this player is ready, then show that in the HTML
      if (snapshot.val()[pid]) {
        $("#r"+pid).addClass("readystatus");
        $("#r"+pid).removeClass("notreadystatus");
        $("#r"+pid).text("Ready");
      } else {
        $("#r"+pid).addClass("notreadystatus");
        $("#r"+pid).removeClass("readystatus");
        $("#r"+pid).text("Not ready");
        allPlayersReady = false;
      }
    }
    // Loop through all player IDs that are not taken in the game lobby
    emptyPlayers.forEach(function(pid) {
      // Show that these players are not online
      $("#p"+pid+" > span").removeClass('online');
      // Show that these players are also not Ready
      $("#r"+pid).addClass("notreadystatus");
      $("#r"+pid).removeClass("readystatus");
      $("#r"+pid).text("Not ready");
    });
    // If all the players in the game lobby are ready, then start the game!
    if (allPlayersReady && emptyPlayers.length !== maxPlayers) {
      beginGame();
    }
  });

  /*
   Listeners on HTML <button>s
    */
  $(document).ready(function() {
    // Set player to ready when they click Ready-Button
    $("#readybtn").on('click', function(){
      gameRef.child("playersReady").child(playerId).set(true);
    });
    // Return to the game selection screen when they click 'back'
    $("#backbtn").on('click', function(){
      goToGameSelection(gameId, playerId);
    });
  });
}

/*
Removes all Firebase and JQuery event handlers attached to events
that are specific to that game lobby.
 */
function cancelLobbyListeners() {
  // cancel the firebase listeners
  gameRef.child('playersReady').off('value', playersListener);
  // cancel the jQuery listeners
  $("#readybtn").off('click');
  $("#backbtn").off('click');
}

/*
Update the database to reflect that the game has gone live
and then re-direct the user to the game-play page
 */
function beginGame() {

  // Add the new live game to the database
  var gameRef = db.ref('liveGames').child(gameId);
  gameRef.update({
    "rocket": {
      "health": 100,
      "powers": {
        "sonic-boom": false,
        "oxygen-refill": -1
      }
    }

  // Delete this game from list of open games
  }).then(
    db.ref('openGames').child(gameId).remove()

  // Direct the user to the game screen
  ).then(function() {
    var url = "./index.html?pid="+playerId+"&gid="+gameId;
    window.location.replace(url);
    window.location = url;
  });
}
