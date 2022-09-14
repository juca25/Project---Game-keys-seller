const router = require('express').Router();
const gamesService = require('../services/games.service');

// renderiza todas las ofertas
router.get('/deals', (_req, res, next) => {
    gamesService
        .getGameDeals()
        .then((deals) => {
            // res.json(deals);
            const list = deals
            // console.log('AQUI VAN LAS GANGUITAS =>', { list });
            res.render('game/gamelist', { list })
        })
        .catch((err) => next(err));
});

// seleccionar juegos
router.get('/game/:title', (req, res, next) => {
    gamesService
        .getDealList(req.params.title)
        .then((game) => {
            //   console.log(game);
            res.json(game);
        })
        .catch((err) => next(err));
});

router.get('/game/game/:gameID', (req, res, next) => {
    gamesService
        .getGameDeal(req.params.gameID)
        .then((games) => {
            console.log(req.params.gameID)
            res.json(games);
        })
        .catch((err) => next(err));
});


module.exports = router;