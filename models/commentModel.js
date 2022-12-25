const mongoose = require("mongoose");


const Comment= new mongoose.Schema({
    comment:{
        type:String,
        require: true
    },

    bagId:{
        type: mongoose.SchemaTypes.ObjectId,
         ref: "Bag"
    },
    
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
         ref: "Customer"
     }



});

module.exports=mongoose.model("Comment", Comment);