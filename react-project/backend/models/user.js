const mongoose = require('mongoose');
const log = console.log;
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    login: {type: Schema.Types.ObjectId, ref: 'login', required: true, unique: true, trim:true},
    info: {type: Schema.Types.ObjectId, trim:true,ref: 'info'},
    creditCard : {type: Schema.Types.ObjectId, trim:true, ref: 'creditCard'},
    status: {type:String,trim: true}
});

// A function to get number of registered users
UserSchema.statics.totalRegistered = function () {
	const user = this;
	log("Counting total users.")

	return user.find({status: "user"}).count().then((total) => {
		return Promise.resolve(total);
	}, (error) => {
		return Promise.rejct();
	})
	
}

// // A function to get the login information of a user
// UserSchema.statics.getLogin = function (id) {
// 	const user = this;
// 	log("Getting user login information.")

// 	return user.findById(id).then((user) => {
// 		const login = user.login;
// 		return Promise.resolve(login);
// 	}, (error) => {
// 		return Promise.reject();
// 	})
// }

const User = mongoose.model('User', UserSchema);
module.exports = { User };
