const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('main.ejs');
});

router.get('/about', (req, res)=>{
    
    res.render('about.ejs');
});

module.exports = router;