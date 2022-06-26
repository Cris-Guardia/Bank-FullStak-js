const express = require('express');
const bp = require('body-parser');
const path = require('path');

/////////////////////////       INITIALIZE

const app = express();
require('./database');

/////////////////////////       SETTINGS

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//////////////////////          MIDDELWARES

app.use(bp.json());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

//////////////////////          ROUTES

app.use(require('./routes/main'));
app.use(require('./routes/users'));
app.use(require('./routes/account'));

//////////////////////          STATIC FIELS

app.use(express.static(path.join(__dirname, 'public')));

//////////////////////          LISTENING

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});