const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //mongodb connection string
    const con = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`Mongo db connected: ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
