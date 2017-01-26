db = firebase.database();

var gameId, playerId;
var gameRef, playerCountListener, readyPlayersListener;


function addLobbyListeners() {
  var playerList=[], readyList=[];
  gameRef = db.ref('openGames').child(gameId);

  /*
   Add a listener for any player changes
   */
  playerCountListener = gameRef.child('player-count').on('value', function(snapshot) {
    if(snapshot.val() < 1) {
      return;
    }
    playerList = [];
    for(var i = 1; i <= snapshot.val(); i++) {
      $("#p"+i+" > span").addClass('online');
      playerList.push(i);
    }
  }, function(e){console.log(e)});

  // Used to change not-ready status to ready status of a given player
  readyPlayersListener = gameRef.child("ready-players").on("child_changed", function(snapshot) {
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

  // Set player to ready when they click Ready-Button
  $(document).ready(function() {
    //$("#readybtn").click(function(){
    $("#readybtn").on('click', function(){
      gameRef.child("ready-players").child(playerId).set(true);
    });
  });
}

function cancelLobbyListeners() {
  // cancel the firebase listeners
  gameRef.child('player-count').off('value', playerCountListener);
  gameRef.child("ready-players").off('child_changed', readyPlayersListener);
  // cancel the jQuery listeners
  $("#readybtn").off('click');
}

// Redirect user to the game-play page
function beginGame() {

  var gameRef = db.ref('liveGames').child(gameId);
  gameRef.update({
    "rocket": {
      "health": 100,
      "powers": {
        "sonic-boom": false,
        "oxygen-refill": -1
      }
    }
  }).then(function() {
    var url = "./index.html?pid="+playerId+"&gid="+gameId;
    window.location.replace(url);
    window.location = url;
  });
    //db.ref('game-in-progress').set(true).then(function(){
    //    var url = "./index.html?pid="+playerId;
    //    window.location.replace(url);
    //    window.location = url;
    //});
}

// Add this code to the game-play page
//player = db.ref('astronauts/undefined');
//player.onDisconnect().remove();
