const express = require("express");
const router = new express.Router();
const Customer = require("../models/customerModel");
const bcryptjs=require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../uploads/fileupload");


router.post("/customer/register",(req,res)=>{
    const email = req.body.email;
    Customer.findOne({email:email})
    .then((result)=>{
        if(result!==null){
            res.json({msg: "User already Exists!"})
            return;
        }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const password = req.body.password;
    const picture = req.body.picture;
    bcryptjs.hash(password, 10,(e,hashed_pw)=>{
        const data = new Customer({
            firstname:firstname,
            lastname:lastname,
            age:age,
            email:email,
            password: hashed_pw,
            picture:picture,
        })
        data.save()
        .then(()=>{
            res.json({message: "User Register Success!"})
        })
        .catch((e)=>{
            res.json(e)
        })
    })  
    })  
})


//customer login
router.post("/customer/login",(req,res)=>{
    const email=req.body.email;
    Customer.findOne({email:email})
    .then((result)=>{
        if(result==null){
            res.status(500).json({messgae:"Sorry! Invalid Credentials!"})
            return;
        }
        const password=req.body.password;
        bcryptjs.compare(password,result.password,(e,success)=>{
            if(success==false){
                res.status(500).json({message:"Sorry! Invalid Credentials!"});
                return;
            }        
            jwt.sign({customer_id : result._id}, "anysecretkey", (e, token)=>{   // generates token/ticket/IDcard ---- with logged in userID
                res.status(200).json({token: token})
            })
        })
    })
    .catch(e=>{
        res.json(e)
    })
})



// +++++++++++  DASHBOARD PAGE of Customer +++++++++++++
// to view dashboard, customer has to be logged in hence customerProtection
router.get("/customer/dashboard", auth.customerProtection, (req,res)=>{
    console.log(req.customerData)
    res.json({ data : req.customerData});

})

// Customer being able to update their profile
router.put("/customer/update", auth.customerProtection, (req,res)=>{

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const email = req.body.email;
    console.log(firstname);
    console.log(firstname);

    Customer.updateOne({_id: req.customerData._id}, {firstname : firstname, lastname : lastname ,age: age, email:email })
    .then(()=>{
        res.json({message:"Customer Profile Updated", success: true})
    })
    .catch((e)=>{
        req.json({message: "Sorry! Please try again"})
    })
})

// Customer uploading picture after they register and login
router.put('/customer/picture/update',auth.customerProtection, upload.single('pic'), (req,res)=>{
    
    if(req.file==undefined){
        return res.json({msg:"Invalid file format. Please try with valid format"});
    }
    Customer.updateOne({_id: req.customerData._id}, {picture : req.file.filename})
    .then(()=>{
        res.json({msg:"Picture Updated Successfully"})
    })
    .catch((e)=>{
        req.json({msg: "Sorry! Please try again"})
    })
})

module.exports = router;