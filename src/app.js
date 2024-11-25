const express = require("express");
const connectDB = require("./config/database.js");

const app = express();
const User = require('./models/user.js')

app.use(express.json());
app.post('/signup', async (req,res) => {
 
  

const user = new User(req.body);
try{
  await user.save();
  res.send('user added successfully');
}catch(err){
  res.status(400).send("error  saving the message:"+ err.message);
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
 })

 app.patch("/update",async (req,res)=>{

  const userId =req.body._id;
  const data = req.body
   try{
   const users = await User.findByIdAndUpdate({_id:userId},data);
   res.send("user updated successfully");
 }catch{
     res.status(404).send("something went wrong");
   }
 })
 





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


