/*
    THIS IS THE MAIN FILE OF THE PROJECT.
    IS A FULLSTACK PROJECT WHO USE JAVASCRIPT
    FOR BACKEND, BOOTSTRAP FOR CSS, EXPRESS FOR NODE
    MONGO FOR DATABASE AND EJS FOR
    INTEGRATE JAVASTRIPT IN HTML CODE.

*/

const express = require('express');
const bp = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

/////////////////////////       INITIALIZE

const app = express();
require('./database.js');
require('./routes/passport.js');

/////////////////////////       SETTINGS

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//////////////////////          MIDDELWARES

app.use(bp.json());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//////////////////////          GLOBAL VARIABLES

app.use((req, res, next) => {
    res.locals.seccess_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_msg = req.flash('error');
    next();
});

//////////////////////          ROUTES on the page

app.use(require('./routes/main'));
app.use(require('./routes/users'));
app.use(require('./routes/account'));

//////////////////////          STATIC FIELS

app.use(express.static(path.join(__dirname, 'public')));

//////////////////////          LISTENING (This one is the function who make the server run).

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});