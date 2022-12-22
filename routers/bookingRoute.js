const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");

const Booking = require("../models/bookingModel");
const { response } = require("express");

router.post("/booking/buy",auth.customerProtection, (req,res)=>{

    const userId = req.customerData._id;
    const bagid = req.body.bagid;
    
    const name=req.body.name;
    const address=req.body.address;
    const number=req.body.number;
    
   

    const data = new Booking({
        userId:userId,
        bagid:bagid,
        name:name,
        address:address,
        number:number
    
        
    })
    console.log(data)
    data.save()
    .then((result)=>{
        res.json({msg: "Purchased"})
    })
    .catch((e)=>{
    console.log(e)
        res.json(e)
    })
})

// display the booking of logged in user
router.get("/booking/display",auth.customerProtection,(req,res)=>{
    Booking.find({userId:req.customerData._id})
    .then((data)=>{
        
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})


router.get("/booking/single/:id", auth.customerProtection, (req, res) => {
    Booking.findOne({ _id: req.params.id })
      .then((data) => {
        
        res.json({ data: data });
      })
      .catch((e) => {
        res.json({ error: e });
      });
  });


  router.delete('/booking/delete/:id',auth.customerProtection,(req,res)=>{
    const id = req.params.id;
    
    Booking.deleteOne({_id:id})
    .then(()=>{
        res.json({msg: 'Booking removed success',status:true})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})

module.exports = router;