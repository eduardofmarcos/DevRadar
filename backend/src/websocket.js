const socketio = require("socket.io");
const transArray = require("./utils/transArray");
const calculate = require("./calculate.js");

const connections = [];
exports.setupWebsocket = server => {
  const io = socketio(server);

  io.on("connection", socket => {
    //console.log(socket.id);
    //console.log(socket.handshake.query);
    const { latitude, longitude, techs } = socket.handshake.query;
    console.log(techs);

    let techArray = transArray(techs);

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: techArray
    });
  });
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(centerCoordinates, pointCoordinates) {
  const radius = 6371;

  const { latitude: lat1, longitude: lon1 } = centerCoordinates;
  const { latitude: lat2, longitude: lon2 } = pointCoordinates;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * center;

  return distance;
}

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => {
        techs.includes(item);
      })
    );
  });
};
