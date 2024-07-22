function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.redirect('/users/singin');
    }
}

module.exports = ensureAuthenticated;