const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE, {});

    console.log(`mongo-db connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error :- ${err.message}`);
    process.exit();
  }
};

module.exports = connectDB;
