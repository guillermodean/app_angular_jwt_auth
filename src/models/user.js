const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    password: String,
    confirmed:  { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: true
});
module.exports = model('user', userSchema);