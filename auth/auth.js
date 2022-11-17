const jwt = require("jsonwebtoken");
const customer = require("../models/customerModel");

// CUSOMTER AUTH
module.exports.customerProtection = (req,res,next)=>{
    console.log("Hree")
    try{
    // receiving token here
    const token = req.headers.authorization.split(" ")[1];
    // token verification
    // the logged in user id is available in data variable below
    const data = jwt.verify(token, 'anysecretkey');
    console.log(data);
    customer.findOne({_id : data.customer_id})
    .then((result)=>{
        req.customerData = result;          // if everything is valid, store here
        next();
    })
    .catch((e)=>{
        res.json({msg: 'Invalid Token'})
    })
}
    catch(e){
        res.json({msg: 'Invalid Access!'})
    }
    // console.log(token)
}


