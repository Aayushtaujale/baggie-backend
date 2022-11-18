
const { application } = require("express");
const express=require("express");
const router= new express.Router();

const auth= require("../auth/auth");
const categoryModel = require("../models/categoryModel");
const Category=require("../models/categoryModel")
const upload = require("../uploads/fileupload");

//blog categories that is only added by Admin
router.post("/admin/addcategory", upload.single('categoryImage'), (req, res, next)=>{
    const categoryName= req.body.categoryName;
    const categoryDetails=req.body.categoryDetails;
    const categoryImage= req.file.path;

    // const categoryImage=req.body.categoryImage;
  const data=new categoryModel({
       categoryName:categoryName,
       categoryDetails: categoryDetails,
       categoryImage: categoryImage
        // categoryImage: categoryImage

    })
    console.log(data);
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
    const categoryDetails=req.body.categoryDetails;
    const categoryImage = req.body.categoryImage;
  
    Category.updateOne(
      { _id: id },
      {
        categoryName:categoryName,
        categoryDetails:categoryDetails,
        categoryImage:categoryImage
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



//particular category
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




  
router.post('/category/picture/update', upload.single('pic'), (req,res)=>{
  const id = req.body.id
  console.log("id: " +id)
  console.log(req.file)
  // console.log(req.file)     // to show mimetypes
  if(req.file==undefined){
      return res.json({msg : "Invalid File Format - Only Jpeg, jpg, and png are supported!"});
  }
  categoryModel.updateOne({_id: id}, {categoryImage : req.file.filename})
  
  .then(()=>{
    console.log("Success")
      res.json({msg: 'Picture Updated!'})
  })
  .catch((e)=>{ 
    console.log(e)
      res.json({msg: 'Please try again!'})
  })
})

module.exports=router