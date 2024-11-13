const express = require("express");
const connectDB = require("./config/database.js");

const app = express();
const User = require('./models/user.js')


app.post('/signup', async (req,res) => {

const user = new User({
userName:'saro',
firstName:'sa',
lastName:'ro',
age:'58'


})
try{
  await user.save();
  res.send('user added successfully');
}catch(err){
  res.status(400).send("error  saving the message:"+ err.message);
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


