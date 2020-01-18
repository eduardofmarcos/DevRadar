const socketio = require("socket.io");
const transArray = require("./utils/transArray");
const calculateDistances = require("./utils/calculateDistance");

const connections = [];
exports.setupWebsocket = server => {
  const io = socketio(server);

  io.on("connection", socket => {
    //console.log(socket.id);
    //console.log(socket.handshake.query);
    const { latitude, longitude, techs } = socket.handshake.query;
    //console.log(techs);

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

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistances(coordinates, connectin.coordinates) < 10 &&
      connections.tech.some(item => {
        techs.includes(item);
      })
    );
  });
};
