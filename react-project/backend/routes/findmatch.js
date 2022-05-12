const { Info } = require("../models/info")
const { User } = require("../models/user")
const router = require('express').Router();
const { ObjectID } = require("mongodb");

// route to find the info record of matched pet for given user
router.route('/findmatch').post((req, res) =>{
    const id = req.body._id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
        return;
    }

    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).send('User not found');
            } else {
                Info.findMatch(user.info).then(matchedInfo => {
                    if (!matchedInfo) {
                        res.status(404).send('No matched found');
                    } else {
                        res.send({matchedInfo: matchedInfo}); 
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
}
)

module.exports = router;