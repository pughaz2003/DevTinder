const mongoose = require("mongoose");



const connectionRequestSchema = new mongoose.connectionRequest({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,

    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,

    },
  Status:{
       type:String,


       enum:{
        values:["interested","ignored","accepted","rejected"],
         message: "{VALUE} is not a valid status",

       }

  }






},


{
    timestamps:true
}

   

)


const connectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = connectionRequestModel;