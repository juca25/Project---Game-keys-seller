const router = require("express").Router();
const isLogedin = require("../middleware/is_logedin.middleware");
const User = require('../models/user.model')
const gamesService = require('../services/games.service');
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;

