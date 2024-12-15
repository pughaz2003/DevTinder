const express = require("express");
const connectDB = require("./config/database.js");
const app = express();



const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth.js");
const { profileRouter } = require("./routes/profile.js");
const { requestRouter } = require("./routes/request.js");





app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);







 





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


