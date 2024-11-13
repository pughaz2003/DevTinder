const express = require("express");
const connectDB = require("./config/database.js");

const app = express();


connectDB()
.then(()=> {
    console.log('Database connected successfully');
   app.listen(3000, () => {
    console.log("server is listenning on port 3000");
      
  });
})

  .catch((err)=>{
console.error('Database is not connected');
});


