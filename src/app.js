const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require('./models/user.js')
const  {validateSignup} = require("./utils/validation.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const {adminAuth} = require("./middleware/auth.js")



app.use(express.json());
app.use(cookieParser());




app.post('/signup', async (req,res) => {
 try{
  const {firstName,lastName,emailId,password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log(hashedPassword);


  const user = new User({
    firstName,
    lastName,
    emailId,
    password:hashedPassword  
  });
  await validateSignup(req);
  
  await user.save();
  res.send('user added successfully');
}catch(err){
  res.status(400).send("ERROR:"+ err.message);
}
});

app.post("/login",async (req,res)=>{
  try{
   const {emailId,password}=req.body;


    const user = await User.findOne({emailId:emailId});
   if(!user) {
   throw new Error("invalid credential")
   }

 const isPasswordValid = await user.validatePassword(password);
  
 
  if(isPasswordValid){

    const token = await user.getJWT();
    

    // Set the token in a cookie
    res.cookie("token", token,{
      expiresIn: '1h' 
    }); 
 
    res.send("login succesfully")
  }else{
   
    throw new Error("invalid credentials!!!!!!!!");
  }

  }catch(err){
    res.status(400).send("ERROR:"+ err.message); 
  }
});


app.get("/profile",adminAuth,async(req,res)=>{
  try{

  res.send(req.user);

  }catch(err){
    res.status(400).send("ERROR:"+ err.message); 
  }

})





app.post("/sendConnectionRequest",adminAuth,async(req,res)=>{

  
  const user = req.user
 
  console.log("sending a connection request");
  res.send( user.firstName + "is login successfully");
 
 



});




 





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


