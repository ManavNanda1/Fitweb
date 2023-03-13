const mongoose = require('mongoose')



const Exercise = new mongoose.Schema({
  bodyPart:String,
  equipment:String,
  gifUrl:String,
  id:{type:Number,unique:true},
  name:String,
  target:String
  },{
    timestamps: true
  });
  

  module.exports = mongoose.model('Exercise', Exercise);