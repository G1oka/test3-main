const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect('mongodb+srv://lasha:lasha123@rustaveli.uejgb.mongodb.net/');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
