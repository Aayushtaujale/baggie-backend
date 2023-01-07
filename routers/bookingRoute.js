const express = require("express");
const router = new express.Router();

const auth = require("../auth/auth");

const Booking = require("../models/bookingModel");
const { response } = require("express");
const upload = require("../uploads/fileupload");


router.post("/booking/buy",auth.customerProtection,upload.single('image'), (req,res)=>{

    const userId = req.customerData._id;
    let item = req.body.item;
    
    const name=req.body.name;
    const address=req.body.address;
    // const image=req.body.image;
    const number=req.body.number;
    const image=req.file.filename;
    const items=[]


console.log(req.body.item)
item=JSON.parse(item)
item.map((itm)=>{

    items.push({

        bagid: itm.id,

        quantity: itm.quantity,

    })

})
   

    const data = new Booking({
        userId:userId,
        items:items,
        name:name,
        address:address,
        number:number,
        image:image,
    
        
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
    Booking.find({userId:req.customerData._id}).populate("items.bagid")
    .then((data)=>{
        
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error:e})
    })
})



router.get("/booking/displayAll",auth.customerProtection,(req,res)=>{
    Booking.find({userId:req.customerData._id}).populate("items.bagid")
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


// router.put('/booking/buy',auth.customerProtection, upload.single('pic'), (req,res)=>{
//     const id = req.body.id
//     if(req.file==undefined){
//         return res.json({msg:"Invalid file format. Please try with valid format"});
//     }
//     Booking.updateOne({_id: id}, {image : req.file.filename})
//     .then(()=>{
//         res.json({msg:"Picture Updated Successfully"})
//     })
//     .catch((e)=>{
//         req.json({msg: "Sorry! Please try again"})
//     })
// })



module.exports = router;