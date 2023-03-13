const express = require("express");
const router = express.Router();
const Admin = require("../model/Admin");
const User = require("../model/User");
const Exercise = require("../model/Exercises");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { findByIdAndDelete } = require("../model/Admin");
const ObjectId = mongoose.Types.ObjectId;

const isAdmin = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

router.get("/login", (req, res) => {
  res.render("Admin/admin");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const match = bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (admin && match) {
      req.session.admin = {
        id: admin._id,
        email: admin.email,
      };
      req.session.save();
      res.redirect("/admin/home");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/home", isAdmin, async(req, res) => {
    const userlist = await User.find()
  res.render("Admin/adminhome", { user: userlist });
});


router.get("/action/userinfo/:userid", isAdmin, async(req, res) => {
    try {
        const userid =req.params.userid
        const data = await Exercise.find({ userid: userid });
        const user = await User.findById(userid);
        res.render("Admin/adminuserprofile", {
          user: user,
          udata: data,
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
});

router.post('/action/removeuser',isAdmin,async (req,res)=>{
    try {
        const {userid}=req.body
        const isuser = await User.findById(new ObjectId(userid))
        if (isuser) {
            await User.findByIdAndDelete(userid)
            res.status(200).json({message:'Succesfullyy deleted'})
        }
        else{
            res.status(404).json({message:'No users withthis id'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
   
})

module.exports = router;
