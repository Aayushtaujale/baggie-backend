const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
    firstname:{
        type : String,
    },
    lastname:{
        type:String
    },
    number:{
        type: Number
    },
     email:{
        type: String,
        required : true
    }, 

    password:{
        type: String,
        required : true
    },
   
    picture : {
        type: String
    },
    address : {
        type: String
    },
    
})
module.exports = mongoose.model('Customer',Customer);