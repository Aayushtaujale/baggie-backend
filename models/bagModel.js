const mongoose = require("mongoose");

const Bag = new mongoose.Schema({

    name: {
        type: String
    },

    price:{
        type: String
    },
    description:{
        type:String
    },

    image : {
        type: String
    },

    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Customer"
    // },

})

module.exports = mongoose.model('Bag', Bag)