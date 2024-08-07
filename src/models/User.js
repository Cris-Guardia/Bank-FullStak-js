const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt  = require('bcryptjs');
const TransferSchema = require('./Transfer');

const UserSchema = new Schema({
    name: {type: String, required: true},
    dateBirth: {type: Date, required: true},
    email: {type: String, required: true},
    money: {type: Number, required: true},
    password: {type: String, required: true},
    transfers: [TransferSchema]
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);