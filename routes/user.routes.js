const express = require('express');
const isLogedin = require('../middleware/is_logedin.middleware');
const router = express.Router();
bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Game = require('../models/game.model')
const saltRounds = 10


// GETS
router.get('/create', (_req, res) => {
    res.render('user/create')
});

router.get('/log-in', (_req, res) => res.render('user/log-in'))

  router.get('/profile', isLogedin, (req, res) => {
        const user = req.session.user;
        console.log(user)
        res.render('user/profile', user);
    })
router.get('/profile/:id', (req, res, next) => {
        const { id: userId } = req.params
        User.findById(userId)
        .then(user => {
        res.render('user/edit', user)
    })
        .catch((err) => next(err))
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
// crear route get para mostrar el hbs 'create-games' para poder utilizar el form
router.get('/create-game',(req,res, next) => {
    res.render('user/games/create-game')
})
// modificar la ruta para poder crear por le método POST el juego (recordar poner la ruta)
router.post('/create-game',(req, res,next)=>{
    let data = {
        title: req.body.title,
        addedBy: req.session.user._id
    }
    let favGame = new Game(data)
    console.log(favGame)
    favGame.save()
    .then(() => {
        res.redirect('/user/games/created-game-view')
    })
    .catch((err) => next(err))
})

router.get('/games/created-game-view',(req, res, next) => {
    res.render('user/games/created-games-view')
})




// esta ruta tendrá que visualizar los juegos favoritos del user
// router.get('/data', isLogedin, (req, res) => {
//     const user = req.session.user._id
//     User
//         .findById(user._id)
//         .populate('favs')
//         .then((favGame) => {
//             console.log(favGame)
//             // crear en hbs para poder ver los detalles de los juegos favs
//             res.render('user/fav-games', { favGame })
//         })
//         .catch((err) => {
//             next(err)
//         })
// })

// // Esta ruta tiene que ser un GET y tendra que actualizar el usuario con el juego que quiere guardar a favs
// router.get('/fav/:id', isLogedin, (req,res,next) => {
//     const user = req.session.user._id
//     const favGame = req.params.id
//     User
//     .findByIdAndUpdate(user, {$addToSet: {favs : favGame}}, {new: true})
//     .then((favGame) => {
//         console.log(favGame)
//         res.render('user/profile')
//     })
//     .catch((err) => 
//         next(err))
//     })
    
module.exports = router; 