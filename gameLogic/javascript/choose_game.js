/* Get database connection */
var db = firebase.database();


/*
Creates a new game instance in firebase
Returns: the gameId of the newly created game
 */
function createNewGame() {
	// Generate a new game instance in the database
	var newGameKey = db.ref('openGames').push().key;

	var gameRef = db.ref('openGames').child(newGameKey);
	gameRef.update({
		"player-count": 0,
		"ready-players": {
			1: false,
			2: false,
			3: false,
			4: false
		}
	});

	return newGameKey;
}

/*
Hides the list of available games and then reveals the lobby
area for that game.
 */
function goToLobby(_gameId, _playerId) {
	$('#lobbyContainer').show();
	$('#gameListContainer').hide();
	$("#p"+_playerId).addClass('myself');
	gameId = _gameId;
	playerId = _playerId;
	addLobbyListeners();
}

function joinGame(_gameId) {

	var gameRef = db.ref('openGames').child(_gameId);

	gameRef.child('player-count').transaction(function(currCount) {
		// abort if there are already the max number of players
		if (currCount < 4) {
			console.log(currCount);
			return currCount + 1;
		} else {
			return;
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
			goToLobby(_gameId, snapshot.val());
		}
	});
}

/*
When the DOM is ready, dynamically create the landing page
 */
$( document ).ready(function() {
	var $div = $('<div id="gameListContainer">');

	// Create the new game button
	var $btn = $('<button id="newGameBtn">New Game</button>');
	$btn.click(function(e) {
		gameId = createNewGame();
		joinGame(gameId);
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

