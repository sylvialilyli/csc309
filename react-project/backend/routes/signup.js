/* server to sign-up the new user*/

// const { CreditCard } = require("../models/creditcard")
// const { Info } = require("../models/info")
const { User } = require("../models/user")
const { Login } = require("../models/login")
const router = require('express').Router();
const { ObjectID } = require('mongodb')
const logger = require('../config/logger')
//const log = logger.log

router.route('/signup').post((req, res) => {
    //get the login object from the front end
    const loginObject = req.body.info

    //console.log(loginObject)
    const login = new Login(loginObject)
    console.log("login obj success")

    login.save()
    .then((result) => {
        const user = new User({
            login: login._id,
            status: req.body.status
        })
        
        user.save()
        .catch(error => {
            console.log("error user save")
            res.status(400).send('Error: ' + error);
            return;
        })
        .then(user => {
            console.log(user._id)
            if(!ObjectID.isValid(user._id)){
                console.log('error', loginObject.user + "add new user failed")
                res.status(400).send('Error: ' + "invalid user info");
                return;
            }else{
                console.log(user._id)
                const body = {
                    _id : user._id
                }
                res.json(body)
            }
            
        })
    })
    .catch(
        (error) => {
            console.log("error login save")
            res.status(400).send('Error: login save' + error) // 400 for bad request
            return;
        }
    )
    
})

module.exports = router;