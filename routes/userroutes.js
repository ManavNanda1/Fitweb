const express = require("express");
const ExercisesOfUser = require("../model/ExercisesOfUser");
const Exercise = require("../model/Exercises");
const User = require("../model/User");
const router = express.Router();
const API = "http://localhost:8000/user/allexercises";

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};
router.get("/allexercises", async (req, res) => {
  res.json({ allexercise: await Exercise.find() });
});

router.get("/exercise", isAuth, async (req, res) => {
  const backdata = await bodyPartData("back");
  const shouldersdata = await bodyPartData("shoulders");
  const chestdata = await bodyPartData("chest");
  const bdata = await bodyPartData("upper arms");
  const bothlegs = [
    ...(await bodyPartData("upper legs")),
    ...(await bodyPartData("lower legs")),
  ];
  const coredata = await bodyPartData("waist");
  const catagoriseddata = {
    backdata: backdata.slice(0, 9),
    shouldersdata: shouldersdata.slice(0, 9),
    chestdata: chestdata.slice(0, 9),
    bdata: bdata.slice(0, 9),
    bothlegs: bothlegs.slice(0, 9),
    coredata: coredata.slice(0, 9),
  };
  res.render("User/Exercise", { cards: catagoriseddata });
});
router.get("/profile", isAuth, async (req, res) => {
  const data = await ExercisesOfUser.find({ userid: req.session.user.id });
  const user = await User.findById(req.session.user.id);
  let exercisedata = [];
  for (let i = 0; i < data.length; i++) {
    const itemdata= await Exercise.findById(data[i].eid)
    exercisedata.push({
      ename:itemdata.name,
      updatedAt:data[i].updatedAt,
      count:data[i].count,
      eid:data[i].eid
    })
  }
  res.render("User/userprofile", {
    user: user,
    udata: exercisedata,
  });
});
router.post("/exercise/save", isAuth, async (req, res) => {
  const { id } = req.body;
  try {
    const isThere = await ExercisesOfUser.find({
      eid: id,
      userid: req.session.user.id,
    });

    if (isThere.length > 0) {
      let counts = isThere[0].count + 1;
      await ExercisesOfUser.findByIdAndUpdate(isThere[0]._id, {
        count: counts,
      });
      res.json({ message: "succsessfully updated" });
    } else {
      const newEx = new ExercisesOfUser({
        eid: id,
        userid: req.session.user.id,
      });
      await newEx.save();
      res.status(200).json({ message: "SUCCESS" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/bmi", isAuth, (req, res) => {
  res.render("User/Bmi");
});
router.get("/index", isAuth, (req, res) => {
  res.render("User/index");
});
router.get("/back", isAuth, async (req, res) => {
  res.render("User/Back", { cards: await bodyPartData("back") });
});
router.get("/biceps", isAuth, async (req, res) => {
  res.render("User/Bicep", { cards: await bodyPartData("upper arms") });
});
router.get("/leg", isAuth, async (req, res) => {
  const bothlegs = [
    ...(await bodyPartData("upper legs")),
    ...(await bodyPartData("lower legs")),
  ];
  res.render("User/Leg", { cards: bothlegs });
});
router.get("/core", isAuth, async (req, res) => {
  res.render("User/Core", { cards: await bodyPartData("waist") });
});
router.get("/shoulder", isAuth, async (req, res) => {
  res.render("User/Shoulder", { cards: await bodyPartData("shoulders") });
});
router.get("/chest", isAuth, async (req, res) => {
  res.render("User/Chest", { cards: await bodyPartData("chest") });
});
router.get("/diet", isAuth, async (req, res) => {
  res.render("User/diet_plan");
});

async function bodyPartData(bodypartname) {
  try {
    const apiget = await fetch("http://localhost:8000/user/allexercises");
    const parse = await apiget.json();
    const onlypartdata = parse.allexercise.filter((item) => {
      return item.bodyPart == bodypartname;
    });
    return onlypartdata;
  } catch (error) {
    return new Error("notavailable");
  }
}

module.exports = router;
