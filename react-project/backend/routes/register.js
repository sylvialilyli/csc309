/*server to submit/update the info of user
--change the info of the user
*/
const { ObjectID } = require('mongodb')
const { User } = require("../models/user")
const { Info } = require("../models/info")
const router = require('express').Router();

router.route('/register').post((req, res) => {
    const userid = req.body._id
    console.log("-----start to register")
    console.log("userid: " + userid)

    if (!ObjectID.isValid(userid)) {
        res.status(404).send("userid not found"); // if invalid id, definitely can't find resource, 404.
        return;
    }
    //console.log(userid)
    console.log("vaild id")

    User.findById(userid)
    .catch(error => {
        res.status(500).json(error); // server error
    })
    .then(user => {
        if (!user) {
            res.status(404).send(); // could not find this user
            return;
        } else {
            //create new info object
            const inforeq = req.body.info
            const newInfo = new Info(inforeq)
            newInfo.save()
            .catch(
                error => {
                    res.status(400).send("save new info failed")
                    return;
                }
            )

            //assign new info to user
            user.info = newInfo._id;
            user.save()
            .then(
                info => {
                    res.status(200).send("save all info success!")
                }
            )
            .catch(
                error => {
                    res.status(400).send(error); // 400 for bad request
                    return;
                }
            )
        }
    })
    

});

module.exports = router;
