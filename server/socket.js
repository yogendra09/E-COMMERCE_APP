const { Server } = require("socket.io");

module.exports.intializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"], // Allow only GET and POST requests
        // credentials: true, // Allow credentials (e.g., cookies)
        },
        // allowEIO3: true,
        // transports: ["websocket"],
      });

    io.on('connection', (socket) => {
        console.log('a user connected',socket.id);

      

        
        socket.on('disconnect', () => {
          console.log('user disconnected',socket.id);
        });
      });

    }



    