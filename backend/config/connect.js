const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hassan130799:wMtMpbwBqUVCD7jA@cluster0.4fnmsh8.mongodb.net/?retryWrites=true&w=majority')
    console.log(`database connected on host:${mongoose.connection.host}`);
}

module.exports = connectDB;