const router = require("express").Router();
const isLogedin = require("../middleware/is_logedin.middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('user/profile', isLogedin, (req, res) => {
  const user = req.session.user;
  res.render('user/profile', user);
})
module.exports = router;
