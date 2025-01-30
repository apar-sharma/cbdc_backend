const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
