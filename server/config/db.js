const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connection

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB CONNECTED:", conn.connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
