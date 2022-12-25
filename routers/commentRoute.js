
const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");

const Comment=require("../models/commentModel");
const { response } = require("express");

router.post("/comment/:id", auth.customerProtection,  (req, res)=>{
    const comment= req.body.comment;
    const customerId = req.customerData._id;
    const bagId= req.params.id;
    const datee = req.body.date;
    const data=new Comment({
        comment:comment,
        customerId: customerId,
        bagId:bagId,
        datee: datee

    })
    // console.log(comment)
    
    data.save()
    .then(()=>{
        res.json({msg:"You commented!"})
    })
    .catch((e)=>{
        res.json(e)
    })
})


router.get("/comment/display/:id", auth.customerProtection, (req,res, next)=>{
    Comment.find({ bagId: req.params.id })
    .populate("customerId")
    .populate("bagId")
    .then((data)=>{
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error : e})
    })
})


module.exports=router