const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransferSchema = new Schema({
    isSended: {type: Boolean},
    reason: {type: String},
    name: {type: String},
    date: {type: Date},
    amount: {type: Number, required: true}
});

module.exports = TransferSchema;