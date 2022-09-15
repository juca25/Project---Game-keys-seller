const express = require('express');
const isLogedin = require('../middleware/is_logedin.middleware');
const router = express.Router();
bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Game = require('../models/game.model');
const { populate } = require('../models/user.model');
const saltRounds = 10

router.get('/log-in', (_req, res) => res.render('user/log-in'))

// GETS
router.get('/create', (_req, res) => {
    res.render('user/create')
});



router.get('/profile', isLogedin, (req, res) => {
    const user = req.session.user;
    console.log(user)
    res.render('user/profile', user);
})
router.get('/profile/:id', (req, res, next) => {
    const { id: userId } = req.params
    User.findById(userId)
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

// POSTS
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
// crear route get para mostrar el hbs 'create-games' para poder utilizar el form
router.get('/create-game', (req, res, next) => {
    res.render('user/games/create-game')
})
// modificar la ruta para poder crear por el método POST el juego (recordar poner la ruta)
router.post('/create-game', (req, res, next) => {
    let data = {
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        addedBy: req.session.user._id

    }
    let newGame = new Game(data)
    // falta controlar el error
    newGame.save()
        .then((gameCreated) => {
            res.redirect(`/user/games/created-game-view/${gameCreated._id}`)
        })
        .catch((err) => next(err))
})



router.post('/log-in', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('user/log-in', console.log('email incorrecta'))
                return
            } else if ((password, user.password) === false) {
                res.render('user/log-in', console.log('contraseña incorrecta'))
                return
            } else {
                req.session.user = user
                res.redirect('/user/profile')
            }
        })
        .catch(error => next(error))
})

router.post('/profile/:id', (req, res, next) => {
    const { username, email, password } = req.body
    User.findByIdAndUpdate(req.params.id, { username, email, password })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => next(err));
});

router.post('/log-out', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})


// falta un params de id. La ruta tiene que buscar un único juego creado de vuestra BD
router.get('/games/created-game-view/:idGame', (req, res, next) => {
    Game.findById(req.params.idGame)
        .populate('addedBy')
        .then(game => {
            res.render('user/games/created-games-view', game)
        })
        .catch(err => next(err))
})


router.get('/allgames', (req, res, next) => {
    // crear un populated para ver el nombre del creador del juego
    Game.find(req.params)
        .populate('addedBy')
        .then(games =>
            res.render('user/games/game-list-user', { games }))
});


// esta ruta tendrá que visualizar los juegos favoritos del user
router.get('/list-favs', isLogedin, (req, res) => {
    const user = req.session.user._id

    User
        .findById(user)
        .populate('favs')
        .then((user) => {
            // crear en hbs para poder ver los detalles de los juegos favs
            // console.log(user.favs)
            res.render('user/games/fav-games', { favs: user.favs })
        })
        .catch((err) => {
            next(err)
        })
})

// // Esta ruta tiene que ser un GET y tendra que actualizar el usuario con el juego que quiere guardar a favs
router.get('/fav/:id', isLogedin, (req, res, next) => {
    const user = req.session.user._id
    const favGame = req.params.id
    User
        .findByIdAndUpdate(user, { $addToSet: { favs: favGame } }, { new: true })
        .then((favGame) => {
            console.log(favGame)
            res.redirect('/user/list-favs')
        })
        .catch((err) =>
            next(err))
})

router.get('/fav/delete/:id', (req, res, next) => {
    const user = req.session.user.id
    User.findOneAndUpdate({ favs: { $in: [req.params.id] } }, { $pull: { favs: req.params.id } }, { new: true })
        .then((updateFav) => {
            req.session.user = updateFav
            return Game.findByIdAndUpdate((req.params.id), {
                $pull: { user: req.session.user._id }
            })
                .then(() => {

                    res.redirect('/user/list-favs');
                })
        })
        .catch((err) => next(err));
});


module.exports = router