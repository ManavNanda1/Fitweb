const express = require("express");

const router = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};
router.get("/", isAuth, (req, res) => {
  res.render("index");
});
module.exports = router;
