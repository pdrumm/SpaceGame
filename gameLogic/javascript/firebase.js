// Get a reference to the database service
var database = firebase.database();


// Set DB from space
function setAstronauts(centerX, centerY, angle, astronautId) {
  firebase.database().ref('astronauts/' + astronautId).set({
    centerX: centerX,
    centerY: centerY,
    angle: angle
  });
};

function setHammers(centerX, centerY, angle, astronautId, startTime, hammerId) {
  firebase.database().ref('hammers/' + hammerId).set({
    centerX: centerX,
    centerY: centerY,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime
  });
};

function setAsteroids(centerX, centerY, angle, astronautId, startTime, size, type, speed, asteroidId) {
  firebase.database().ref('asteroids/' + asteroidId).set({
    centerX: centerX,
    centerY: centerY,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime,
    size: size,
    type: type,
    speed: speed
  });
};

function setRocket(astronautId, health) {
  firebase.database().ref('rocket/powers/oxygen-refill').set(astronautId);
  firebase.database().ref('rocket/health/').set(health);
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

  return firebase.database().ref('astronauts/'+ astronautId).update({
    centerX: centerX,
    centerY: centerY,
    angle:angle});
};

function updateRocket(health, astronautId) {
  // rocket data entry
  var rocketHealth = {
    health: health
  };
  var oxygenRefil = {
    astronautId: astronautId
  };

  // write rocket data to database
  // TODO 
};

