const port = 4000;
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

// All request will be parsed into Json.
app.use(express.json()); 

// Used to connect project to 4000 port.
app.use(cors());  

// Database Connectivity by Mongodb
//Remaining............................................

//API creation

app.get("/", (req,res)=>{
    res.send("Express App is Running");
})



app.listen(port, (error)=>{
    if(!error){
        console.log("Server Running on Port "+port);
    }
    else{
        console.log("Error : "+ error);
    }
})
