require('dotenv').config()
const express = require('express')
const session = require('express-session')
const Grant = require('grant').express()
const bodyParser = require('body-parser')
const userModel = require('./models/user.model');
const { connect } = require('./models/database');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session);
const grant = new Grant(require("./config/grant.config"));
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    secret: 'grant',
    store: new MongoStore({
        dbPromise:connect()
    }),
    resave: false,
    saveUninitialized: false
}))

app.use(grant)
app.use(cookieParser())
app.use(morgan(':method :url :status '))


//routes
//app.use(require("./routes/auth.route"))
app.use(require("./routes/connect.route"))
app.use("/accounts",require('./routes/accounts.route'));
app.use("/user", require("./routes/user.route"))


module.exports = app
