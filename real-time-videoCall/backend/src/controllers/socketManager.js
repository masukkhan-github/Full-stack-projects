import { Server } from "socket.io";

let messages = {};    // store chat history per room
let timeOnline = {};  // track when a user connected
const MAX_HISTORY = 50; // keep only last 50 messages per room

export const connectToSocket = (server) => {
  const io = new Server(server,{
    cors: {
      origin: "*",
      methods:["GET","POST"],
      allowedHeaders: ["*"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    // user joins a call/room
    socket.on("join-call", (path) => {
      socket.join(path);
      timeOnline[socket.id] = new Date();

      // notify others in the same room
      socket.to(path).emit("user-joined", socket.id);

      // send stored messages to the new user
      if (messages[path]) {
        messages[path].forEach((msg) => {
          socket.emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg["socket-id-sender"]
          );
        });
      }
    });

    // signaling for WebRTC (used to exchange SDP/ICE)
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    // handle chat messages
    socket.on("chat-message", (data, sender, path) => {
      if (!messages[path]) messages[path] = [];

      const msg = { sender, data, "socket-id-sender": socket.id };
      messages[path].push(msg);

      // keep only last MAX_HISTORY messages
      if (messages[path].length > MAX_HISTORY) {
        messages[path].shift();
      }

      // broadcast to others in the room
      socket.to(path).emit("chat-message", data, sender, socket.id);
    });

    //  handle disconnect
    socket.on("disconnect", () => {
      const duration = (new Date() - timeOnline[socket.id]) / 1000;
      console.log(`User ${socket.id} was online for ${duration} seconds`);

      // notify all rooms the socket was part of
      for (let room of socket.rooms) {
        if (room !== socket.id) {
          socket.to(room).emit("user-left", socket.id);
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};
