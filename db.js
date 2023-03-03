const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/fitweb",  {
    useNewUrlParser: true,
  }).then(()=>{
    console.log("Runs Succesfully")
  }).catch((e)=>{
    console.log(e);
    console.log("Not Connected")
  })
