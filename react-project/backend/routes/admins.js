const { CreditCard } = require("../models/creditcard")
const { User } = require("../models/user")
const { Login } = require("../models/login")
const { Info } = require("../models/info")
const router = require('express').Router();
const { ObjectID } = require('mongodb')


// route to get the number of registered user in the database
router.route('/admin/registered').get((req, res) =>{
    User.totalRegistered()
        .then(total => {
            res.send({numRegistered: total});
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
})

// route to get the proportion of vips out of registered users
router.route('/admin/vips').get((req, res) => {
    CreditCard.vipAmount()
        .then(amount => {
            res.send({vip: amount.vip, total: amount.total});
        })
        .catch(error => {
            res.status(500).send(); //server error
        })
})

// route to get the login information of a specified user
router.route('/admin/user').get((req, res) => {
    const user =  req.body.user;
    console.log("Getting login info")

    Login.findOne({user: user}).then(login => {
        if (!login) {
            res.status(404).send("Info Not Found")
        } else {
            res.send(login)
        }
    }).catch((error) => {
        res.status(505).send(error)
    })
})

// route to update the login information of a specified user
router.route('/admin/user').patch((req, res) => {
    const user = req.body.user;
    const newpass = req.body.password;
    console.log("Updating login info")

    Login.findOne({user: user}).then(login => {
        if (!login) {
            res.status(404).send("Info Not Found")
        } else {
            login.password = newpass;
            login.save();
            res.send(login)
        }
    }).catch((error) => {
        res.status(400).send(error)
    })

})

router.route('/admin/:user').delete((req, res) => {
    const user = req.params.user;//get the user name from front-end
    console.log(user)
    Login.findOne({
        user: user
    })
    .then((login) => {
        if(!login){
            res.status(404).send("login not found")
            return;
        }else{
            User.findOne({
                login:login
            }).then((user) => {
                if(!user){
                    res.status(404).send("user not found")
                    return;
                }else{
                    //delete each items:
                    if(user.status !== "user"){
                        res.status(404).send("User not found")
                        return;
                        }else{

                            User.findByIdAndDelete(user._id).catch((error) =>{
                                res.status(500).send("user delete failed")
                                return;
                            })
                            Login.findByIdAndDelete(login._id).catch((error) =>{
                                res.status(500).send("login delete failed")
                                return;
                            })

                            if(!ObjectID.isValid(user.creditCard)){
                             //body.creditCard = null;
                            console.log("credit not found")}
                            else{
                                CreditCard.findByIdAndRemove(user.creditCard)
                                .then((creditCard) => {
                                console.log("credit found")
                                })
                                .catch((error) =>{
                                    res.status(500).send("credit card found error")
                                    return;
                                })
                            }
                    

                            if(!ObjectID.isValid(user.info)){                    
                                console.log("info not found")
                                res.send("success logout");
                            }else{
                                Info.findByIdAndRemove(user.info).then((info) =>{
                                console.log("info found")
                                res.send("success remove");})
                                .catch((error) =>{
                                    res.status(500).send("info found error")
                                    return;
                                })
                            }
                        }
                    }
                })
        }
    })
    .catch(error => {
        res.status(500).send(); // server error, could not delete.
    });
})



module.exports = router;