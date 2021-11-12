var mongoose = require("mongoose");
//const validator =require('validator')
// const uuidv1 = require("uuid/v1");
const jwt=require('jsonwebtoken')

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})
  
module.exports = mongoose.model("User",userSchema);