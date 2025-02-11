const express = require("express");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest.js")

const {adminAuth} = require("../middleware/auth.js")

userRouter.get("/user/requests",adminAuth,async(req,res)=>{
try{
const loggedInUser = req.user;

const connectionRequests = await connectionRequest.find({
    toUserId :loggedInUser._id,
    status:"interested"
})

res.json({message:"list pending request",
    data:connectionRequests

})  

}
catch(error){
    res.status(400).send("Error:"+error.msg);
}





})
module.exports ={ userRouter};