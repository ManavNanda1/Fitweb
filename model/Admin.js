const mongoose = require('mongoose')



const Admin = new mongoose.Schema({
    email: String,
    password: String,
    name:String
  },{
    timestamps: true
  });
  

  module.exports = mongoose.model('Admin', Admin);