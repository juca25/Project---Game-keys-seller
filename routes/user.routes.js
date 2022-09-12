const express = require('express');
const router = express.Router();
bcrypt = require('bcrypt')
const User = require('../models/user.model')

router.get('/log-in', (_req, res) => res.render('user/log-in'))

router.get('/profile', (_req, res) => {
    User.find()
        .then((users) => {
            res.render('user/profile', { users })
        })
        .catch((err) => next(err))
})

router.get('/create', (_req, res) => {
    res.render('user/create')
});

router.get('/profile/edit/:id', (req, res, next) => {
    const { id: userId } = req.params
    User.findById(userId)
        .then(user => {
            res.render('user/edit', user)
        })
        .catch((err) => next(err))

})

router.post('/create', (req, res, next) => {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
        .then(() => {
            res.redirect('/user/profile')
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/profile/edit/:id', (req, res, next) => {
    const { username, email, password } = req.body
    User.findByIdAndUpdate(req.params.id, { username, email, password })
        .then(() => {
            res.redirect('/user/profile');
        })
        .catch((err) => next(err));
});

router.post('/user/log-in', (req, res, next) => {

  const { email, password } = req.body

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('user/log-in', { errorMessage: 'Email no registrado en la Base de Datos' })
        return
      } else if (bcrypt.compareSync(password, user.password) === false) {
        res.render('user/log-in', { errorMessage: 'La contraseña es incorrecta' })
        return
      } else {
        req.session.currentUser = user
        res.redirect('/')
      }
    })
    .catch(error => next(error))
})


router.post('user/log-out', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})

    module.exports = router;