const router = require('express').Router();

router.get('/operations', (req, res)=>{
    res.render('operations');
});

module.exports = router;