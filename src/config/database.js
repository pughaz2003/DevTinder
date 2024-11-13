const mongoose = require("mongoose");

const connectDB = async ()   => { 
  await mongoose.connect( "mongodb+srv://pughaz668:Hnfbs84DwWPfWuuF@devtinder.w1ta9.mongodb.net/");
};

module.exports = connectDB;



