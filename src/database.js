const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BANCO_FULL_JS', {
    useNewUrlParser: true
}).then(db => console.log(`DB is connected`))
.catch(err => console.error(err));