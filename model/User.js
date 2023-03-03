const mongoose = require('mongoose')



const User = new mongoose.Schema({
    email: String,
    password: String,
    image:String,
    name:String
  },{
    timestamps: true
  });
  

  module.exports = mongoose.model('User', User);