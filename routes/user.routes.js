const express = require('express');
const isLogedin = require('../middleware/is_logedin.middleware');
const router = express.Router();
bcrypt = require('bcrypt')
const User = require('../models/user.model')
const saltRounds = 10

router.get('/log-in', (_req, res) => res.render('user/log-in'))

router.get('/create', (_req, res) => {
    res.render('user/create')
});

router.post('/log-in', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('user/log-in', console.log('Email o contraseña incorrecta'))
                return
            } else if ((password, user.password) === false) {
                res.render('user/log-in', console.log('Email o contraseña incorrecta'))
                return
            } else {
                req.session.user = user
                res.redirect('user/profile')
            }
        })
        .catch(error => next(error))
})

router.get('/delete/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => next(err));
});

router.post('/create', (req, res, next) => {
    const { username, email, password } = req.body;
    bcrypt.
        genSalt(10)
        .then((salts) => {
            return bcrypt.hash(password, salts)

        })
        .then((pass) => {
            return User.create({ password: pass, username, email })
        })
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/log-out', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;