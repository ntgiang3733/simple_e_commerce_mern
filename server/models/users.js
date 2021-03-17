const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength: 32,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        index: { unique: true },
        match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
        type: String,
        require: true,
    },
    userRole: { 
        type: Number,
        default: 0,
        required: true,
    },
    phoneNumber: { 
        type: Number,
    },
    userImage: {
        type: String,
        default: "user.png",
    },
    verified: {
        type: String,
        default: false,
    },
    secretKey: {
        type: String,
        default: null,
    },
    history: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;