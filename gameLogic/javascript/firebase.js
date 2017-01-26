// Get a reference to the database service
var database = firebase.database();


// Set DB from space
function setAstronauts(centerX, centerY, angle, astronautId) {
  GAME_REF.child('astronauts/' + astronautId).set({
    centerX: centerX,
    centerY: centerY,
    angle: angle
  });
}

function setHammers(centerX, centerY, angle, astronautId, startTime, hammerId) {
  GAME_REF.child('hammers/' + hammerId).set({
    centerX: centerX,
    centerY: centerY,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime
  });
}

function setAsteroids(centerX, centerY, angle, astronautId, startTime, size, type, speed, asteroidId) {
  GAME_REF.child('asteroids/' + asteroidId).set({
    centerX: centerX,
    centerY: centerY,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime,
    size: size,
    type: type,
    speed: speed
  });
}

function setRocket(astronautId, health) {
  GAME_REF.child('rocket/powers/oxygen-refill').set(astronautId);
  GAME_REF.child('rocket/health/').set(health);
}


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

  return GAME_REF.child('astronauts/'+ astronautId).update({
    centerX: centerX,
    centerY: centerY,
    angle:angle});
}

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
}

function removeHammer(hammerId) {
  GAME_REF.child('hammers/' + hammerId).remove();
}

function removeAsteroid(asteroidId) {
  GAME_REF.child('asteroids/' + asteroidId).remove();
}
