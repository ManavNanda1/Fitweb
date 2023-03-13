const express = require("express");
const Exercise = require("../model/Exercises");
const User = require("../model/User");
const router = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/exercise", isAuth, async (req, res) => {
const backdata =await bodyPartData('back')
const shouldersdata =await bodyPartData('shoulders')
const chestdata =await bodyPartData('chest')
const bdata =await await bodyPartData('upper arms')
const bothlegs = [...await bodyPartData("upper legs"),... await bodyPartData("lower legs")]
const coredata = await bodyPartData('waist')
console.log();
const catagoriseddata={
  backdata:backdata.slice(0,9),
  shouldersdata:shouldersdata.slice(0,9),
  chestdata:chestdata.slice(0,9),
  bdata:bdata.slice(0,9),
  bothlegs:bothlegs.slice(0,9),
  coredata:coredata.slice(0,9),
}
  res.render("User/Exercise", { cards:catagoriseddata  });
});
router.get("/profile", isAuth, async (req, res) => {
  const data = await Exercise.find({ userid: req.session.user.id });
  const user = await User.findById(req.session.user.id);
  res.render("User/userprofile", {
    user: user,
    udata: data,
  });
});
router.post("/exercise/save", isAuth,async (req, res) => {
  const { d } = req.body;
  try {
    const isThere =await Exercise.find({ name: d, userid: req.session.user.id });
    console.log();
    if (isThere.length>0) {
    res.status(300).json({ message: "Already Done" });
    }
    else{
      const newEx = new Exercise({
        name: d,
        userid: req.session.user.id,
      });
      await newEx.save();
      res.status(200).json({ message: "SUCCESS" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/bmi',isAuth,(req,res)=>{
  res.render('User/Bmi')
})
router.get('/index',isAuth,(req,res)=>{
  res.render('User/index')
})
router.get('/back',isAuth,async(req,res)=>{
  res.render('User/Back',{cards:await bodyPartData('back')})
})
router.get('/biceps',isAuth,async(req,res)=>{
  res.render('User/Bicep',{cards:await bodyPartData('upper arms')})
})
router.get('/leg',isAuth,async(req,res)=>{
  const bothlegs = [...await bodyPartData("upper legs"),... await bodyPartData("lower legs")]
  res.render('User/Leg',{cards:bothlegs})
})
router.get('/core',isAuth,async(req,res)=>{
  res.render('User/Core',{cards:await bodyPartData('waist')})
})
router.get('/shoulder',isAuth,async(req,res)=>{
  res.render('User/Shoulder',{cards:await bodyPartData('shoulders')})
})
router.get('/chest',isAuth,async(req,res)=>{
  res.render('User/Chest',{cards:await bodyPartData('chest')})
})
router.get('/diet',isAuth,async(req,res)=>{
  res.render('User/diet_plan')
})



async function bodyPartData(bodypartname) {
  const exdata = await fetch("https://manavnanda1.github.io/Task3_Bootstrap_Manav_Nanda/Manav_nanda_Task_3(Bootstrap)/output.json");
  const parsedata = await exdata.json();
  const onlypartdata = parsedata.filter((item) => {
    return item.bodyPart == bodypartname;
  });
  return onlypartdata
}

module.exports = router;
