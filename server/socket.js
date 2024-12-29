const { Server } = require("socket.io");
const connectDB = require("./config/db.config");
module.exports.intializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://e-store-sooty-phi.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
      allowedHeaders: [
        "X-Requested-With",
        "Content-Type",
        "Authorization",
        "Cookie",
      ],
      credentials: true, // Allows cookies and other credentials
    },
    // allowEIO3: true,
    // transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    connectDB(socket);


    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
