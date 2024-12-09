const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require('./models/user.js')
const  {validateSignup} = require("./utils/validation.js")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');


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

 const passwordValid = await bcrypt.compare(password, user.password)
  
 
  if(passwordValid){

    const token = await jwt.sign({ _id: user._id }, 'godfather543');
    console.log(token);

    // Set the token in a cookie
    res.cookie("token", token); 
 
    res.send("login succesfully")
  }else{
   
    throw new Error("invalid credentials");
  }

  }catch(err){
    res.status(400).send("ERROR:"+ err.message); 
  }
});


app.get("/profile",async(req,res)=>{
  try{
const cookies = req.cookies;

const {token} = cookies;
if(!token){
  throw new Error("invalid credentials")
}
   
const decoded = await jwt.verify(token, 'godfather543');
console.log(decoded)
const {_id} = decoded;
console.log("THE LOGGRED IN USER IS:"+_id);

const user = await User.findById(_id);
if(!user){
  throw new Error("ther is no user exist")
}

res.send(user);

  }catch(err){
    res.status(400).send("ERROR:"+ err.message); 
  }

})





app.get("/user",async(req,res)=>{

  const userEmail = req.body.emailId;
try{
 
  const user = await User.find({emailId:userEmail}); 
  if(user.length === 0){
    res.status(404).send("something went wrong"); 
  }else{
      
  res.send(user);

  }
}catch{
  res.status(404).send("something went wrong");
}
  


})

app.get("/feed",async (req,res)=>{

 const userAge =req.body.age;
  try{
  const users = await User.findOne({age:userAge});
  res.send(users);
}catch{
    res.status(404).send("something went wrong");
  }
})

app.delete("/users",async (req,res)=>{

  const userAge =req.body.age;
 
  try{
  const users = await User.findOneAndDelete({age:userAge});
  
   res.status(200).send("ssuccessfully deleted"); 

  
 }catch{
     res.status(404).send("something went wrong");
   }
 });

 app.patch("/update/:userId",async (req,res)=>{

  const userId = req.params?.userId;
  const data = req.body;



   try{
    
    const ALLOWED_UPDATES = ["firstName","lastName","age","gender","skills"];

    const isAllowedUpdates = Object.keys(data).every( (k)=> 
     ALLOWED_UPDATES.includes(k)
    );
    if(!isAllowedUpdates){
    throw new Error("updates not allowed");
    }

    if(data.skills.length>10){
      throw new Error("only 10 characters is allowed");
    }

   const users = await User.findByIdAndUpdate({_id:userId},data);
   res.send("user updated successfully");
    }catch(error){
     res.status(404).send(error.message);
   }
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


