
const express = require('express')
const router= express.Router()
const google = require('googleapis');
const accounts= require('../models/account.model');


/* var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.key,config.secret, "http://localhost"+config.callback) */


//router.use(auth)
router.get('/',async function (req, res) {

    var {userId}= req.session
    var userAccounts=await accounts.find({userId})
    res.json(userAccounts)
    
})



module.exports=router