import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/lib/db.js";
import userRouter from "./src/routes/user.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

export const userSocketMap = {}; // store online user - {userId: socketId}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // emit online user to connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("Server is running");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;

await connectDB();

// async function start() {
//   server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }
// start();

export default server;
