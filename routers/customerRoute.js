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
    const number = req.body.number;
    const password = req.body.password;
    const picture = req.body.picture;
    const address = req.body.address;
    bcryptjs.hash(password, 10,(e,hashed_pw)=>{
        const data = new Customer({
            firstname:firstname,
            lastname:lastname,
            number:number,
            email:email,
            password: hashed_pw,
            picture:picture,
            address: address,
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


