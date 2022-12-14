const { application } = require("express");
const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");

const Bag = require("../models/bagModel");
const { response } = require("express");
const upload = require("../uploads/fileupload");



router.post("/bag/add",  upload.single('image'),(req,res)=>{

    // const userId = req.customerData._id;
    // const venueid = req.body.venueid;
    
    const name=req.body.name;
    
    const price=req.body.price;
    const description=req.body.description;
    const image=req.file.filename;

    const data = new Bag({
        name:name,
        price:price,
        description:description,
        image:image
        
    
        
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


router.get("/bags/all",(req,res)=>{
    Bag.find().then(result=>{
        res.status(201).json({success:true,data:result})
    })
})


router.get("/bag/display", auth.customerProtection,(req,res)=>{
    Bag.find({userId:req.customerData._id})
    .then((data)=>{
        
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})



router.get("/bagg/single/:id", auth.customerProtection, (req, res) => {
    Bag.findOne({ _id: req.params.id })
      .then((data) => {
        
        res.json({ data: data });
      })
      .catch((e) => {
        res.json({ error: e });
      });
  });

  router.delete('/bag/delete/:id',(req,res)=>{
    const id = req.params.id;
    
    Bag.deleteOne({_id:id})
    .then(()=>{
        res.json({msg: 'Bag removed success',status:true})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})




module.exports=router








