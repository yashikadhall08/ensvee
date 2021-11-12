const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes")
const cookieParser = require("cookie-parser")

mongoose.connect('mongodb+srv://Yashika:eE2o9tp2H7oKemDz@cluster0.sw7ru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

 var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  
  app.use(cors(corsOptions));
 
  app.use(bodyParser.json());
  
  
  app.use(bodyParser.urlencoded({ extended: true }));

 app.use("/",userRoutes);

  app.listen(process.env.PORT || 8080, () =>{
      console.log("server is running");

  })
  