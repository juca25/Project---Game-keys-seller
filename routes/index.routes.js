const router = require("express").Router();
const isLogedin = require("../middleware/is_logedin.middleware");
const User = require('../models/user.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/profile', isLogedin, (req, res) => {
  const user = req.session.user;
  console.log(user)
  res.render('user/profile', user);
})
module.exports = router;

router.get('/profile/:id', (req, res, next) => {
  const { id: userId } = req.params
  User.findById(userId)
    .then(user => {
      res.render('user/edit', user)
    })
    .catch((err) => next(err))
})


router.post('/profile/:id', (req, res, next) => {
  const { username, email, password } = req.body
  User.findByIdAndUpdate(req.params.id, { username, email, password })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => next(err));
});


