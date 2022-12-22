const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    bagid: {
        
        type: String
    },

    name:{
        type:String
    },

    address:{
        type:String
    },
    number:{
        type:String
    }



})

module.exports = mongoose.model('Booking', Booking)