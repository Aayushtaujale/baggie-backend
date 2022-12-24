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

// VENUE LOGIN

router.post("/venue/login", (req,res)=>{
    const email = req.body.email;
    Venue.findOne({email:email})

    .then((result123)=>{
        if(result123==null){
            res.json({msg: 'Invalid Credentials!'})
            return;
        }

        const password = req.body.password;
        bcryptjs.compare(password, result123.password, (e,success)=>{
            if(success==false){
                res.json({msg: "Invalid Credentials Password!"})
                return;
            }

            jwt.sign({venue_id: result123._id}, "anysecretkey", (e,token)=>{
                res.json({token: token, venueId:result123._id})
            })
        })
    })
    .catch(e=>{
        res.json(e)
    })

})





module.exports = router;
