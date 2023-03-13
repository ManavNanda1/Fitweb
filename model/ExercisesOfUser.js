const mongoose = require('mongoose')



const ExercisesOfUser = new mongoose.Schema({
    eid:String,
    userid:String,
    count:{
      type:Number,
      default:1
    }
  },{
    timestamps: true
  });
  

  module.exports = mongoose.model('ExercisesOfUser', ExercisesOfUser);