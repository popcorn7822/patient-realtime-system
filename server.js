const express = require("express");
const next = require("next");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("typing", (data) => socket.broadcast.emit("typing", data));
    socket.on("submitForm", (data) => socket.broadcast.emit("submitForm", data));
    socket.on("disconnect", () => console.log("Client disconnected"));
  });

  server.all("*", (req, res) => handle(req, res));

  httpServer.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
});
