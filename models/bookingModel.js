const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

   

    name:{
        type:String
    },

    address:{
        type:String
    },
    number:{
        type:String
    },
    image : {
        type: String
    },

    items:[
        {
            bagid: {
        
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bag"
            },quantity:{type:Number,default:1},
            name:{type:String}
        }

    ]



})

module.exports = mongoose.model('Booking', Booking)