const app = require('./app.js');
const http = require('http');
const intializeSocket = require('./socket.js');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
 
require('./socket.js').intializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});