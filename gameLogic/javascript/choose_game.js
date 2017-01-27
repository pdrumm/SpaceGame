var maxPlayers = 4;

/* Get database connection */
var db = firebase.database();

/*
Creates a new game instance in firebase
Returns: a Promise containing the new gameId
 */
function createNewGame() {
	return new Promise(function(resolve, reject) {
		// Generate a new game instance in the database
		var newGameKey = db.ref('openGames').push().key;

		var gameRef = db.ref('openGames').child(newGameKey);
		gameRef.update({
			"playersReady": {
				1: false
			}
		}).then(
			resolve(newGameKey)
		);
	});
}

/*
Uses an atomic Firebase transaction to add a new player to the game selected.
Upon successful transaction, this function calls goToLobby()
 */
function joinGame(_gameId) {

	var gameRef = db.ref('openGames').child(_gameId);
	var _playerId;

	gameRef.child('playersReady').transaction(function(currPlayers) {
		// abort if there are already the max number of players
		if (!currPlayers) {
			return;
		} else {
			var range = [];
			for (var i=1; i<=maxPlayers; ++i) {
				range.push(i);
			}
			for (var pid in currPlayers) {
				pid = parseInt(pid);
				range.splice(range.indexOf(pid), 1);
			}
			if (range.length > 0) {
				_playerId = range[0];
				currPlayers[_playerId] = false;
				return currPlayers;
			} else {
				return;
			}
		}

	}, function(error, committed, snapshot) {
		if (error) {
			console.log("Transaction failed abnormally.");
		} else if (!committed) {
			// The room was actually full, so inform the user
			alert("Sorry, this game is full.");
			console.log("We aborted the transaction.");
		} else {
			// Move the player into the lobby
			goToLobby(_gameId, _playerId);
		}
	});
}

/*
Hides the list of available games and then reveals the lobby
area for that game.
 */
function goToLobby(_gameId, _playerId) {
	// Cleanup HTML to reflect current game states
	for (var i=1; i<=4; ++i) {
		$("#p"+i).removeClass('myself');
	}
	$("#p"+_playerId).addClass('myself');
	// Show the game lobby
	$('#lobbyContainer').show();
	$('#gameListContainer').hide();
	gameId = _gameId;
	playerId = _playerId;
	addLobbyListeners();
}

/*
Return to the list of available games and
cancel listeners for the previously selected game
 */
function goToGameSelection(_gameId, _playerId) {
	// Cleanup firebase
	cleanFirebaseAfterPlayerLeavesGame(_gameId, _playerId);
	// Cleanup listeners
	cancelLobbyListeners();
	// Show Game Selection page
	$('#lobbyContainer').hide();
	$('#gameListContainer').show();
	// Cleanup global vars
	gameId = undefined;
	playerId = undefined;
}

function cleanFirebaseAfterPlayerLeavesGame(_gameId, _playerId) {
	var gameRef = db.ref('openGames').child(_gameId);
	gameRef.child('playersReady').child(_playerId).remove();
}

/*
When the DOM is ready, dynamically create the landing page
 */
$( document ).ready(function() {
	var $div = $('<div id="gameListContainer">');

	// Create the new game button
	var $btn = $('<button id="newGameBtn">New Game</button>');
	$btn.click(function(e) {
		createNewGame().then(function(_gameId){
			var _playerId = 1;
			goToLobby(_gameId, _playerId);
		});
	});
	$div.append($btn);

	// Generate the list of games from firebase as a <ul>
	var $ul = $('<ul id="gameList"></ul>');
	$div.append($ul);
	$('body').append($div);

	// When a new game is created, add it to the list
	db.ref('openGames').on('child_added', function(snapshot) {
		var gameId = snapshot.key;
		var $li = $('<li>'+gameId+'</li>');
		$li.data('gameId', gameId);
		$('#gameList').append($li);

		// When an <li> is clicked, go to the lobby for that game
		$li.click(function(e) {
			var selectedGameId = $(e.target).data('gameId');
			joinGame(selectedGameId);
		});
	});

	// When a game is no longer open, remove it from the list
	db.ref('openGames').on('child_removed', function(snapshot) {
		var $li = $('#gameList > li').filter(function() {
			return $(this).data('gameId') == snapshot.key;
		});
		$li.remove();
	})
});
