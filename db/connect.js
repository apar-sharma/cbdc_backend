const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(process.env.CONNECT_URL);
};

module.exports = connectDB;
