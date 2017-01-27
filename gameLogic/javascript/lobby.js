db = firebase.database();

var gameId, playerId;
var gameRef, currPlayersListener, readyPlayersListener;


function addLobbyListeners() {
  var playerList=[], readyList=[];
  gameRef = db.ref('openGames').child(gameId);

  gameRef.child('ready-players').child(playerId).onDisconnect().set(false);
  gameRef.child('curr-players').child(playerId).onDisconnect().set(false);

  /*
   Add a listener for detecting new/exiting players
   */
  currPlayersListener = gameRef.child('curr-players').on('value', function(snapshot) {
    playerList = [];
    for (var pid in snapshot.val()) {
      if (snapshot.val()[pid]) {
        playerList.push(pid);
        $("#p"+pid+" > span").addClass('online');
      } else {
        $("#p"+pid+" > span").removeClass('online');
      }
    }
  });

  /*
  Add a listener to detect when players are ready
   */
  readyPlayersListener = gameRef.child("ready-players").on("value", function(snapshot) {
    readyList = [];
    for (var pid in snapshot.val()) {
      if (snapshot.val()[pid]) {
        $("#r"+pid).addClass("readystatus");
        $("#r"+pid).removeClass("notreadystatus");
        $("#r"+pid).text("Ready");
        readyList.push(pid);
      } else {
        $("#r"+pid).addClass("notreadystatus");
        $("#r"+pid).removeClass("readystatus");
        $("#r"+pid).text("Not ready");
      }
    }

    // determine if all players are ready
    var ready = (playerList.length > 0);
    playerList.forEach(function(player) {
      if (readyList.indexOf(player) < 0) {
        ready = false;
      }
    });
    if (ready) {
      beginGame();
    }
  });

  // Listeners on HTML <button>s
  $(document).ready(function() {
    // Set player to ready when they click Ready-Button
    $("#readybtn").on('click', function(){
      gameRef.child("ready-players").child(playerId).set(true);
    });
    // Return to the game selection screen when they click 'back'
    $("#backbtn").on('click', function(){
      goToGameSelection(gameId, playerId);
    });
  });
}

function cancelLobbyListeners() {
  // cancel the firebase listeners
  gameRef.child('curr-players').off('value', currPlayersListener);
  gameRef.child("ready-players").off('value', readyPlayersListener);
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

// Add this code to the game-play page
//player = db.ref('astronauts/undefined');
//player.onDisconnect().remove();
