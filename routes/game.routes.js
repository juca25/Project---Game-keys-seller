const router = require('express').Router();
const { getPrice } = require('../services/games.service');
const gamesService = require('../services/games.service');

// renderiza todas las ofertas
router.get('/deals', (_req, res, next) => {
    gamesService
        .getGameDeals()
        .then((deals) => {
            //   res.json(deals);
            const list = deals

            console.log(deals)

            // console.log('AQUI VAN LAS GANGUITAS =>',{list});
            res.render('game/gamelist', { list })
        })
        .catch((err) => next(err));
});

// seleccionar juegos
router.get('/game/get/title', (req, res, next) => {

    const { title } = req.query

    gamesService
        .getDealList(title)
        .then((game) => {


            // res.json(game)
            res.render('game/gamessearch', { game })
        })
        .catch((err) => next(err));
});

router.get('/check-game/:gameID', (req, res, next) => {
    gamesService
        .getGameDeal(req.params.gameID)
        .then((game) => {
            // console.log(game.deals.price)
            console.log(game);
            // res.json(game);
            res.render('game/check-game', game)
        })
        .catch((err) => next(err));
});
router.get('/game/store/:storeID', (req, res, next) => {
    gamesService
        .getStore(req.params.storeID)
        .then((game) => {
            //   console.log(game);
            res.json(game);
        })
        .catch((err) => next(err));
});

router.get('/game/img/:thumb', (req, res, next) => {
    gamesService
        .getThumb(req.params.thumb)
        .then((game) => {
            console.log(game.thumb);
            res.json(game);
        })
        .catch((err) => next(err));
});

router.get('/redirect/:dealID', (req, res, next) => {
    gamesService
        .getRedirect(req.params.dealID)
        .then((game) => {
            console.log(game);
            res.json(game);
        })
        .catch((err) => next(err));
});

router.post('/:title', (req, res, next) => {
    gamesService
        .getDealList(req.params.title)
        .then((game) => {
            //   console.log(game);
            res.redirect('game/:id')
        })
        .catch((err) => next(err));
});


module.exports = router;