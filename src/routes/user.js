const express = require("express");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest.js")
const User = require("../models/user.js")

const {adminAuth} = require("../middleware/auth.js")

userRouter.get("/user/requests",adminAuth,async(req,res)=>{
try{
const loggedInUser = req.user;

const connectionRequests = await connectionRequest.find({
    toUserId :loggedInUser._id,
    status:"interested"
}).populate("fromUserId","firstName lastName")

res.json({message:"list pending request",
    data:connectionRequests

})  

}
catch(error){
    res.status(400).send("Error:"+error.message);
}
});

userRouter.get("/user/connections",adminAuth,async(req,res)=>{

    try{

        const loggedInUser = req.user;
        const acceptedConnections = await connectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
              ]

              
        }).populate("fromUserId","firstName LastName")
        .populate("toUserId","firstName LastName");

        const data = acceptedConnections.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })
        
        res.status(200).json({
            message: "List of accepted connections",
            data
          });

    }catch(error){
        res.status(400).send("ERROR:"+error.message)
    }


});
userRouter.get("/feed",adminAuth,async(req,res)=>{
try{
    const loggedInUser = req.user;
  const connectionRequests = await connectionRequest.find({
    $or: [
        { fromUserId: loggedInUser._id},
        { toUserId: loggedInUser._id }
      ]

  }).select("fromUserId toUserId")

const hideUserFromFeed = new Set();
connectionRequests.forEach((req)=>{
    hideUserFromFeed.add(req.fromUserId.toString());
    hideUserFromFeed.add(req.toUserId.toString());
});
console.log(hideUserFromFeed)

const users = await User.find({
    $and:[
        { _id: {$nin: Array.from(hideUserFromFeed) } },
        { _id: {$ne: loggedInUser._id} }

    ]

    
}).select("firstName lastName skill age")


  res.send(users);

}catch(error){
    res.status(400).send("ERROR"+error.message);
}
});





module.exports ={ userRouter};