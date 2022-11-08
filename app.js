const express = require("express");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.static(__dirname+'/uploadsFolder'));
app.use(cors());


require("./connection/connection");

const customerRoute = require("./routers/registerRoute");
app.use(customerRoute);


app.listen(90);