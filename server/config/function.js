const userModel = require('../models/users');

exports.toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
};

exports.validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    } 
    return false;
};

exports.emailCheckInDatabase = async function(email) {
    let user = await userModel.findOne( { email: email });
    user.exec((err, data) => {
        if(!data) return false;
        return true;
    });
}
exports.phoneNumberCheckInDatabase = async function(phoneNumber) {
    let user = await userModel.findOne( { phoneNumber: phoneNumber });
    user.exec((err, data) => {
        if(!data) return false;
        return true;
    });
}