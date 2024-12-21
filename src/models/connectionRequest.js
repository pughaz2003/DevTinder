const mongoose = require("mongoose");



const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        index:true

    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        index:true

    },
  status:{
       type:String,
       enum:{
        values:["interested","ignored","accepted","rejected"],
        message: "{VALUE} is not a valid status"},
        required:true,
}},
{
    timestamps:true
});

connectionRequestSchema.pre("save", function (next) {
    if (this.fromUserId.equals(this.toUserId)) { 
        const err = new Error("You cannot send a request to yourself.");
        return next(err); 
    }
    next(); 
});


const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = connectionRequestModel;