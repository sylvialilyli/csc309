'use strict';

const express = require('express')
//const bodyParser = require('body-parser')
const cors = require('cors')
const { mongoose } = require('./db/mongoose.js')

// const {User} = require('./models/user')
// const {Info} = require('./models/info')
// const {CreditCard} = require('./models/creditcard')
// const {Login} = require('./models/login')

const app = express();
//app.use(bodyParser.json())
app.use(cors())
//app.use(express.json())

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);


// app.get('/', (req, res) => {
// 	res.send("connection!")
// })

//test connection
mongoose.set('useFindAndModify', false); // for some deprecation issues

//for debug
// const test = require('./routes/testDemo')
// app.use('/',test)

const upGrade = require('./routes/upgrade')
const loginRouter = require('./routes/login')
const findMatchRouter = require('./routes/findmatch')
const registerRouter = require('./routes/register')
const signUpRouter = require('./routes/signup')
const adminRouter = require('./routes/admins')
const logger = require('./config/logger')

logger.log('error', `server setup`);
// logger.log('info',`login info`)

app.use('/',upGrade)
app.use('/',loginRouter)
app.use('/',findMatchRouter)
app.use('/',registerRouter)
app.use('/',signUpRouter)
app.use('/',adminRouter)

// /*** Webpage routes below **********************************/
// Serve the build
var path = require('path');

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '../build')));

// // All routes other than above will go to index.html
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });
// }
const log = console.log;

app.use(express.static(path.join(__dirname, '../build')));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});



/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})