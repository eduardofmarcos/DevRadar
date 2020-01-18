const socketio = require("socket.io");
const transArray = require("./utils/transArray");
const calculate = require("./utils/Calculate");

const connections = [];
let io;
exports.setupWebsocket = server => {
  io = socketio(server);

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

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculate(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(items => techs.includes(items))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
