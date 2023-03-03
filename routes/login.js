const express = require("express");
const bcrypt = require("bcrypt");
const path = require('path')
const router = express.Router();
const User = require("../model/User");


router.get('/', (req, res) => {
    if(!req.session.user){
        res.render('login')
    }
    else{
        res.redirect('/home');
    }
})
router.post("/register", async (req, res) => {
    const {profileimage} = req.files;
    const img_src=Math.random()+path.extname(profileimage.name);
    const { name,email, password } = req.body;
  
    try {
      const user = await User.find({ email: email });
      if (user.length>0) {
        return res.status(402).json({ message: 'This email is not available' });
      }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await profileimage.mv(path.join(__dirname,"../view/uploads",img_src));
        const newuser =new User({
            email:email,
            password:hashedPassword,
            name:name,
            image:img_src
        })
        newuser.save()
        res.status(200).json({ message: "User saved sucessfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const match = bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    if (user && match ) {
      req.session.user = {
        id: user._id,
        email: user.email,
        name: user.name
      };
      res.redirect("/user/index");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/logout", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  }
  req.session.destroy((err) => {
    if (err) throw err;
  });
});
module.exports = router;
