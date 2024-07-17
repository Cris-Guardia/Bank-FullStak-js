const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/jsBank';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((db) => {
    console.log(`DB is connected`);

})
.catch(err => {
    console.log('DB is not connected');
    console.log(err);
});

module.exports = { mongoose };