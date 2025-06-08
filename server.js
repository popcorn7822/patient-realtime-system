
const express = require("express");
const next = require("next");
const http = require("http");
const socketIo = require("socket.io");

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);

  io.on("connection", (socket) => {
    socket.on("typing", (data) => socket.broadcast.emit("typing", data));
    socket.on("submitForm", (data) => socket.broadcast.emit("submitForm", data));
  });

  server.all("*", (req, res) => handle(req, res));
  httpServer.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
