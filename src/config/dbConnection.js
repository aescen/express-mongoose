const mongoose = require('mongoose');

// set false to wait connection before using models
mongoose.set('bufferCommands', false);

const url = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017';

const dbConnection = mongoose.connect(url, {
  serverSelectionTimeoutMS: 8000, // Server connection timeout after 8s instead of 30s
  maxPoolSize: 2, // default 5
});

module.exports = dbConnection;
