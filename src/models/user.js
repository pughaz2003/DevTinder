const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName :
    {
       type: String,
    },
    firstName :
    {
       type: String,
    },
    lastName :
    {
       type: String,
    },
    password:
    {
       type: Number,
    },
    age:{
       type: Number,
    }
})

module.exports = mongoose.model('User',userSchema);