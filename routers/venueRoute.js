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

router.get("/venue/all", (req,res)=>{
    Venue.find().then(result=>{
        res.status(201).json({success:true,data:result})
    })

    
})

router.get("/venue/dashboard", auth.venueProtection, (req,res)=>{
    console.log(req.venueData)
    res.json({ data : req.venueData});
})

//finding bookings
router.get("/venue/bookings", (req,res)=>{
    bookingModel.find().then(result=>{
        res.status(201).json({success:true,data:result})
    })
   
})


// posting venue id
router.post("/venue/bookings", (req,res)=>{
    console.log(req.body)
    bookingModel.find({venueid:req.body.venueId}).populate("items.bagid")
    .then(result=>{
        res.status(201).json({success:true,data:result})
    })
   
})

router.put("/venue/update", auth.venueProtection, (req,res)=>{
    res.json({msg: 'Venue Updated Successfully!'})

})

//updating picture of venue
router.put('/venue/picture/update',auth.venueProtection, upload.single('pic'), (req,res)=>{
    
    if(req.file==undefined){
        return res.json({msg:"Invalid file format. Please try with valid format"});
    }
    Venue.updateOne({_id: req.venueData._id}, {picture : req.file.filename})
    .then(()=>{
        res.json({msg:"Picture Updated Successfully"})
    })
    .catch((e)=>{
        req.json({msg: "Sorry! Please try again"})
    })
})




module.exports = router;
