const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");

const Bag = require("../models/bagModel");
const { response } = require("express");



router.post("/add/bag",auth.customerProtection, (req,res)=>{

    // const userId = req.customerData._id;
    // const venueid = req.body.venueid;
    
    const name=req.body.name;
    
    const details=req.body.details;
    const picture=req.body.picture;

    const data = new Booking({
        name:name,
        details:details,
        picture:picture,
        
    
        
    })
    console.log(data)
    data.save()
    .then((result)=>{
        res.json({msg: "Booked"})
    })
    .catch((e)=>{
    console.log(e)
        res.json(e)
    })
})

















