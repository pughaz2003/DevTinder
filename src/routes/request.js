const express = require("express");
const requestRouter = express.Router();
const { adminAuth } = require("../middleware/auth.js");
const connectionRequest = require("../models/connectionRequest.js");
const user = require("../models/user.js")


requestRouter.post("/request/send/:status/:toUserId", adminAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id; 
        const toUserId = req.params.toUserId; 
        const status = req.params.status; 

        const allowedStatus = ["interested","ignored"];
        
        if(!allowedStatus.includes(status)){
            throw new Error("cannot allow this status update")
        }

        const UserId = await user.findById(toUserId); 
       
        if (!UserId) { 
            throw new Error("Invalid details: The user does not exist.");
        }
        


        const existingRequest = await connectionRequest.findOne({
      $or:[

       {fromUserId,toUserId},
           {fromUserId:toUserId,toUserId:fromUserId}
       ]});



       if (existingRequest) {
           throw new Error("A request already exists between these users.");
       }
       const request = new connectionRequest({
            fromUserId,
            toUserId,
            status,
        });

 const data =  await request.save(); 

        res.status(201).json({message:"Request created successfully!",data});
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});



requestRouter.post("/request/recieved/:status/:requestId", adminAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        console.log("Received status:", status);
        console.log("Allowed statuses:", allowedStatus);

        if (!allowedStatus.includes(status)) {
            throw new Error("This status is not valid!!");
        }

        // Find the connection request
        const request = await connectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });

        if (!request) {
            throw new Error("Connection request is not found");
        }

        // Update the status
        request.status = status;

        const data = await request.save();
        res.status(201).json({ message: `Request ${status} successfully!`, data });
    } catch (err) {
        console.error(err.message); // Log the error
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = { requestRouter };
