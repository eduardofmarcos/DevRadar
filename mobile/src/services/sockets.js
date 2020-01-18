import socketio from "socket.io-client";
import { NativeModulesProxy } from "@unimodules/core";

const socket = socketio("http://192.168.0.6:4000", {
  autoConnect: false
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };
  socket.connect();

  socket.on("message", text => {
    console.log(text);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewDevs };
