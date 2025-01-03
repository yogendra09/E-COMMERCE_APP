const mongoose = require('mongoose');

const connectDB = async(socket)=>{
    try {
      const conn =await mongoose.connect(process.env.MONGO_URL);
      socket.emit('db_connected', { message: 'connected to database' });
      console.log(`database connected!: ${conn.connection.host}`)
   

    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;