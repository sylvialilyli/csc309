const mongoose = require('mongoose');
const date = require('date-and-time');
const log = console.log;
const { User } = require('../models/user')

const CreditCardSchema = new mongoose.Schema({
    endDate: {type:Date},
    cardHolderName: {type: String},
    cardNumber: {type: String},
    expiredTime: {type: String},
    secureCode: {type: String}
});

// A function to get percentage of VIP users
CreditCardSchema.statics.vipAmount = async function () {
	const credit = this;
    log("Counting VIP percents.")
    
    //match records that have endDate field, whose value is not null and is greater than current date
    //Can I use async functio here?
    //, $gt: new Date()
    const vip = await credit.find({endDate: { $exists: true, $ne: null}}).count() 
    return User.totalRegistered().then((result) =>{
        if (result === 0) {
            return Promise.resolve(0)
        } else {
            const amounts = {vip: vip, total: result}
            return Promise.resolve(amounts);
        }
    }).catch((error) => {
        return Promise.reject();
    })
}

const CreditCard = mongoose.model('CreditCard', CreditCardSchema);
module.exports = { CreditCard };