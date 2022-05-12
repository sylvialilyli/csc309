const { Login } = require("../models/login")
const { User } = require("../models/user")
const { CreditCard } = require("../models/creditcard")
const { Info } = require("../models/info")
const router = require('express').Router();
const { ObjectID } = require('mongodb')
const { logger } = require('../config/logger')

router.route('/login').post((req, res) =>{
    //get the login information from the front-end
    const loginObject = req.body.login
    //const log = logger.log
    //log('info',`${loginObject.user} entering login process`)

    //check the validation of the given object
    Login.validatePass(loginObject.user, loginObject.password)
    .then(login => {
        //check the status in the user
        User.findOne({
            login:login
        })
        .then((user) =>{
            
            if(!user){
                //log('error',`${loginObject.user} user not found`)
                res.status(404).send("user not found: user: null")
                return;
            }else{
                if(user.status === req.body.status){
                    var body = {
                        _id: user._id,
                        login : login,
                        creditCard: null,
                        info: null,
                        status: user.status
                    }

                    // logger.log('info',"login success: " + user.login)
                    // logger.log('info',"credit: " + user.creditCard)
                    // logger.log('info',"info: " + user.info)

                    if(!ObjectID.isValid(user.creditCard)){
                        body.creditCard = null;
                      //  logger.log('info',"credit not found")
                    }else{
                        CreditCard.findById(user.creditCard)
                        .then((creditCard) => {
                            body.creditCard = creditCard
                          //  logger.log('info',"credit found")
                        })
                        .catch((error) =>{
                            //logger.log('error',`${loginObject.user} credit card found error`)
                            res.status(500).send("credit card found error")
                            return;
                        })
                    }

                    if(!ObjectID.isValid(user.info)){
                        body.info = null;
                        //logger.log('info',"info not found")
                        req.session.user = user._id;
                        //logger.log(req.session.user)
                        res.send(body)
                    }else{
                        Info.findById(user.info).then((info) =>{
                            body.info = info
                            //logger.log('info',"info found")
                            req.session.user = user._id;
                            console.log('info',"session: "+ req.session.user)
                            res.send(body)
                        })
                        .catch((error) =>{
                           // logger.log('error',`${loginObject.user} info found error`)
                            res.status(500).send("info found error")
                            return;
                        })
                    }
                    //logger.log("login success!!!")
                    //res.send(body)
                }   
                else{
                    res.status(400).send("wrong privilege")
                }
            }
            
        })
        .catch((error) => {
            res.status(404).send("user not found")
        })
    })
    .catch(error => {
        res.status(400).send(error)
    });
}
)

// A route to logout a user
router.route('/logout').post((req, res) =>{
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});


router.route('/check-session').post((req, res) =>{
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});


module.exports = router;