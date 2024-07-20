const router = require('express').Router();
const ensureAuthenticated = require('../middelware/authenticated');

router.get('/account', ensureAuthenticated, (req, res)=>{
    const name = 'pinaazndzad';
    const dateBirth = 'pinaazndzad';
    const email = 'pinaazndzad';
    const money = '69.420';
    res.render('../views/account/account.ejs', {name, dateBirth, email, money});
});

router.get('/account/transfer', ensureAuthenticated, (req, res)=>{
    res.render('../views/account/transfer.ejs');
});

router.get('/account/history', ensureAuthenticated, (req, res)=>{
    res.render('../views/account/history.ejs');
});

module.exports = router;