/* Back-end service aimed to update the vip infomation*/
const { CreditCard } = require("../models/creditcard")
const { User } = require("../models/user")
const router = require('express').Router();
const { ObjectID } = require('mongodb')

router.route('/upgrade').post((req, res) => {
    const userid = req.body._id
    const credit = req.body.creditCard
    

    //chech the valiadation of the id
    if (!ObjectID.isValid(userid)) {
        res.status(404).send("invalid userid");
        return;
    }

    User.findById(userid)
    .catch(error => {
        res.status(500).json(error); // server error
        return;
    })
    .then(user => {
        if (!user) {
            res.status(404).send(); // could not find this user
            return;
        }
        else {
            //create new info object
            if(!user.creditCard){
                const newCredit = new CreditCard(credit)
                newCredit.save()
                .catch((error) => {
                    res.status(400).send("save new credit failed")
                    return;
                })
                user.creditCard = newCredit._id
                user.save()
                .then(
                    info => {
                        res.status(200).send("save all info success!")
                        return;
                    }
                )
                .catch(
                    error => {
                        res.status(400).send(error); // 400 for bad request
                        return;
                })

            }else{
                const creditId = user.creditCard;
                CreditCard.findByIdAndUpdate(creditId, {$set: credit}, {new: true})
                .catch(error => {
                    res.status(404).send(error)
                    return;
                })
                .then(creditCard => {
                    if(!creditCard){
                        res.status(404).send("credit not exist")
                        return;
                    }
                    res.status(200).send("upgrade success")
                })
            }    
        }
    })
});

module.exports = router;
