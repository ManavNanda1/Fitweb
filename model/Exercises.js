const mongoose = require('mongoose')



const Exercise = new mongoose.Schema({
    name:String,
    userid:String,
  },{
    timestamps: true
  });
  

  module.exports = mongoose.model('Exercise', Exercise);