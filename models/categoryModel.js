const mongoose = require("mongoose");
const multer= require('multer')
const upload=multer({dest: "/uploads/"});

const Category= new mongoose.Schema({
    categoryName:{
        type:String,
        require: true
    },

    categoryDetails:{
        type:String,
        require: true
    },
    categoryImage:{
        type: String,
        required: true }
    ,

 
    // userId: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //      ref: "User",
         
    //     require: true
    //  }



});

module.exports=mongoose.model("Category", Category);

