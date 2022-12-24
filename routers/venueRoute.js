const express = require("express");
const router = new express.Router();
const Venue = require("../models/venueModel");
const bcryptjs = require("bcryptjs");   // this encrypts the password 
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const bookingModel = require("../models/bookingModel");
const upload = require("../uploads/fileupload");

router.post("/venue/register", (req,res)=>{
    

    const email = req.body.email;
    Venue.findOne({ email:email })  // Checking if theres duplicate email.. 
    .then((result)=>{
        if(result!==null){
            res.json({msg: "Restaurant already Exists! "})
            return;
        }

    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const picture = req.body.picture;
    
    const password = req.body.password;
    bcryptjs.hash(password, 10, (e, hashed_pw)=>{
        const data = new Venue({
            name:name,
            address:address,
            phone:phone,
            email:email,
            password:hashed_pw,
            picture: picture
        })

        data.save()

        .then(()=>{
            res.json({msg: "User registered!"})
        })
        .catch((e)=>{
            res.json(e)
        })
    })
    })
})





module.exports = router;
