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

function setRocket() {
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

function updateHammers(centerX, centerY, angle, astronautId, startTime, hammerId) {
  // hammer data entry
  var hammerData = {
    centerX: centerX,
    centerY: centerY,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime
  };

  // write hammer data to database
  var updates = {};
  updates['hammers/' + hammerId] = hammerData;

  return firebase.database().ref('hammers/'+ hammerId).update({
    centerX: centerX,
    centerY: centerY,
    angle:angle,
    astronautId: astronautId,
    startTime: startTime
  });
};

function updateAsteroids(centerX, centerY, size, speed, angle, astronautId, startTime, type, asteroidId) {
  // asteroid data entry
  var asteroidData = {
    centerX: centerX,
    centerY: centerY,
    size: size,
    speed: speed,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime,
    type: type
  };

  // write asteroid data to database
  var updates = {};
  updates['asteroids/' + asteroidId] = asteroidData;

  return firebase.database().ref('asteroids/'+ asteroidId).update({
    centerX: centerX,
    centerY: centerY,
    size: size,
    speed: speed,
    angle: angle,
    astronautId: astronautId,
    startTime: startTime,
    type: type
  });
};

function removeHammer(hammerId) {
  firebase.database().ref('hammers/' + hammerId).remove();
};

function removeAsteroid(asteroidId) {
  firebase.database().ref('asteroids/' + asteroidId).remove();
};
