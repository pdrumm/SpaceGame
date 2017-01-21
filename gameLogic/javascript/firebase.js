// Get a reference to the database service
var database = firebase.database();

// Set DB from space
function setAstronauts(centerX, centerY, width, height, canvasWidth, canvasHeight, astronautId) {
  firebase.database().ref('astronauts/' + astronautId).set({
    centerX: centerX,
    centerY: centerY,
    width: width,
    height: height,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight
  });
};
function setRocket() {
  firebase.database().ref('rocket/' + '/powers/' + powerName).set({
    valid: true
  });
};

//Update from space to DB
function updateAstronauts(centerX, centerY, angle, astronautId) {
  // astronaut data entry
  var astronautData = {
    centerX: centerX,
    centerY: centerY,
    angle: angle
  };

  // write astronaut data to database
  var updates = {};
  updates['astronauts/' + astronautId] = astronautData;

  return firebase.database().ref('astronauts/'+ astronautId).update({centerX: centerX, centerY: centerY, angle:angle});
};

