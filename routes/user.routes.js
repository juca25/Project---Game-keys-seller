const express = require('express');
const router = express.Router();
const User = require('../models/user.model')


router.get('/profile', (_req, res) => {
    User.find()
        .then((users) => {
            res.render('user/profile', { users })
        })
        .catch((err) => next(err))
})

router.get('/usercreate', (_req, res) => {
    res.render('user/usercreate')
});

router.get('/profile/edit/:id', (req, res, next) => {
    const { id: userId } = req.params
    User.findById(userId)
        .then(user => {
            res.render('user/edit', user)
        })
        .catch((err) => next(err))
})

router.get('/user/profile/delete/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/drones');
        })
        .catch((err) => next(err));
});

router.post('/usercreate', (req, res, next) => {
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
            res.redirect('/');
        })
        .catch((err) => next(err));
});

module.exports = router;