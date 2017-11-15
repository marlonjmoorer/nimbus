const express = require('express')
const session = require('express-session')
const Grant = require('grant').express()
const bodyParser = require('body-parser')
const config = require('./config');

const grant= new Grant(config.grant);
const app= express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({secret: 'grant'}))
app.use(grant)

//routes
app.use("/auth",require("./routes/auth.route"))
app.use("/user",require("./routes/user.route"))

module.exports=app
