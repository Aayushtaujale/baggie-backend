
const { application } = require("express");
const express=require("express");
const router= new express.Router();

const auth= require("../auth/auth");
const Category=require("../models/categoryModel")
const upload = require("../uploads/fileupload");

//blog categories that is only added by Admin
router.post("/admin/addcategory",  (req, res)=>{
    const categoryName= req.body.categoryName;
    const categoryDetails=req.body.categoryDetails
    // const categoryImage=req.body.categoryImage;
    const data=new Category({
        categoryName:categoryName,
        categoryDetails: categoryDetails
        // categoryImage: categoryImage

    })
    data.save()
    .then(()=>{
        res.json({msg:"Catgory Added"})
    })
    .catch((e)=>{
        res.json(e)
    })
    



})


// displaying categories
router.get("/category/display",  (req,res, next)=>{
    Category.find()
    .then((data)=>{
        res.json({data:data})
    })
    .catch((e)=>{
        res.json({error : e})
    })
})




// updating category
router.put("/cat/update",  (req, res) => {
    console.log("ssssssssssssssssssssssssss");
    console.log(req.body);
    const id = req.body.id;
    const categoryName = req.body.categoryName;
    const categoryDetails=req.body.categoryDetails
  
    Category.updateOne(
      { _id: id },
      {
        categoryName:categoryName,
        categoryDetails:categoryDetails
      }
    )
    
      .then(() => {
        res.json({ msg: "Post updated" });
      })
      .catch((e) => {
        res.json({ error: e });
      });
  });



router.delete('/category/delete/:id', (req,res)=>{
    const id = req.params.id;
    console.log(id);
    Category.deleteOne({_id: id})
    .then(()=>{
        res.json({msg: ' Successfully removed', status:true})
    })
    .catch((e)=>{
        res.json({err : e})
    })
})




router.get("/categorys/:id",  (req, res) => {
    console.log("hey")
    Category.findOne({ _id: req.params.id })
      .then((data) => {
        console.log(data);
        res.json({ data: data });
      })
      .catch((e) => {
        res.json({ error: e });
      });
  });


module.exports=router