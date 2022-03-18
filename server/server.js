import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.use(express.static("../client/dist"));

const wsServer = new WebSocketServer({ noServer: true });
wsServer.on("connect", (socket) => {
  setTimeout(() => {
    socket.send(JSON.stringify({ author: "Server", message: "Hello there" }));
  }, 1000);
  socket.on("message", (data) => {
    const { author, message } = JSON.parse(data);
    socket.send(JSON.stringify({ author, message }));
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connect", socket, req);
    });
  });
});
