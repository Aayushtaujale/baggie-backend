const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    bagid: {
        
        type: String
    },



})

module.exports = mongoose.model('Booking', Booking)