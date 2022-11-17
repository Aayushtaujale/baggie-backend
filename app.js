const express = require("express");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(__dirname+'/uploadsFolder'));
require("./connection/connection");


const customerRoute = require("./routers/customerRoute");
app.use(customerRoute);



const categoryRoute=require("./routers/categoryRoute");
app.use(categoryRoute);

app.listen(90);