const express = require('express')
const router= express.Router()
const accounts= require('../models/account.model');



router.get('/',async function (req, res) {
    var {userId}= req.session
    var userAccounts=await accounts.find({userId})
    res.json(userAccounts)
    
})
module.exports=router