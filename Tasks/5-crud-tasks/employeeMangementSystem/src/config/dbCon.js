const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};



module.exports = dbConnection