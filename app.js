const express = require("express");
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(express.static(__dirname+'/uploads'));
app.use(cors());


require("./connection/connection");


const customerRoute = require("./routers/customerRoute");
app.use(customerRoute);



const categoryRoute=require("./routers/categoryRoute");
app.use(categoryRoute);

const bagRoute=require("./routers/bagRoute");
app.use(bagRoute);

const bookingRoute=require("./routers/bookingRoute");
app.use(bookingRoute);

// const commentRoute=require("./routers/commentRoute");
// app.use(commentRoute);

const venueRoute=require("./routers/venueRoute");
app.use(venueRoute);

app.listen(90);