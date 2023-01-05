const mongoose = require("mongoose");

const Venue = new mongoose.Schema({

    name: {
        type: String
    },

    address: {
        type: String
    },

    phone: {
        type: String
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    picture : {
        type: String
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    items:[
        {
            bagid: {
        
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bag"
            },quantity:{type:Number,default:1}
        }

    ]

})

module.exports = mongoose.model('Venue', Venue)