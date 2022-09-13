const express = require('express');
const router = express.Router();
// bcrypt = require('bcrypt')
// const isLogedin = require("../middleware/is_logedin.middleware");
const User = require('../models/user.model')



router.get('/log-in', (_req, res) => res.render('user/log-in'))

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

router.post('/log-in', (req, res, next) => {

    const { email, password } = req.body


    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('user/log-in', console.log('nombre inc'))
                return
            } else if ((password, user.password) === false) {
                res.render('user/log-in', console.log('contraseña inc'))
                return
            } else {
                req.session.user = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

router.post('/create', (req, res, next) => {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
        .then(() => {
            res.redirect('/')
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





router.post('user/log-out', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;
