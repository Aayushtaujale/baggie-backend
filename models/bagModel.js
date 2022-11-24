const mongoose = require("mongoose");

const Bag = new mongoose.Schema({

    name: {
        type: String
    },

    details:{
        type: String
    },

    picture : {
        type: String
    },

    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Customer"
    // },

})

module.exports = mongoose.model('Bag', Bag)