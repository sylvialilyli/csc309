const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
log = console.log


const LoginSchema = new mongoose.Schema({
	user: {
		type:String,
		required:true,
		trim: true,
		unique:true
	},
    password: {
		type:String,
		required: true
	}
});

LoginSchema.pre('save', function(next) {
	const login = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (login.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(login.password, salt, (err, hash) => {
				login.password = hash
				next()
			})
		})
	} else {
		next()
	}
})



// A function to compare and validate the entered password of username during login
LoginSchema.statics.validatePass = function(username, password) {
	const Login = this;

	log("Validating password")
	//log(username)
	//log(password)
	return Login.findOne({ user: username}).then((login) => {
		console.log("start vaild")
		if (!login) {
			console.log(login)
			console.log("login not found")
			return Promise.reject()
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, login.password, (err, result) => {
				if (result) {
					log("validation success")
					resolve(login)
				} else {
					log("pass wrong")
					reject()
				}
			})
		})
	})
}



const Login = mongoose.model('Login', LoginSchema);
module.exports = { Login };