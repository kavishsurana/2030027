const mongoose = require('mongoose');

const Schema = mongoose.Schema

const trainSchema = new Schema({
    companyName :
    {
        type: String,
        require : true
    },
    ownerName : {
        type : String,
        require : true
    },
    rollno : {
        type : Number,
        require : true
    },
    ownerEmail : {
        type : String,
        require : true
    },
    accessCode : {
        type : String,
        require : true
    }
})


module.exports = new mongoose.model("train" , trainSchema)