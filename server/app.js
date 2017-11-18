const express = require('express')
const session = require('express-session')
const Grant = require('grant').express()
const bodyParser = require('body-parser')
const config = require('./config');
const database = require('./database');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session);
const grant= new Grant(config.grant);
const app= express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret: 'grant',
    store: new MongoStore({dbPromise:database.connect()}),
    resave:false,
    saveUninitialized:false
}))


app.use(grant)
app.use(cookieParser())
app.use(morgan(':method :url :status '))
//routes
app.use("/auth",require("./routes/auth.route"))
app.use("/user",require("./routes/user.route"))

app.use(async(req,res,next)=>{
    if(!req.session.user&&req.cookies.SESSION){
        const users= await database.collection("user")
        req.session.user=await users.findOne({_id:req.cookies.SESSION})
    } 
    next()
})
module.exports=app
