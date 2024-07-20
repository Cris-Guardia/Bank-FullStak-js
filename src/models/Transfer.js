const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransferSchema = new Schema({
    reciverName: {type: String},
    reciverEmail: {type: String, required: true},
    senderName: {type: String},
    senderEmail: {type: String},
    date: {type: Date},
    amount: {type: Number, required: true}
});

module.exports = {TransferSchema};