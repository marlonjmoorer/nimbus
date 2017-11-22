const express = require('express')
const router= express.Router()
const accounts= require('../models/account.model');



router.get('/',async function (req, res) {
    var {userId}= req.session
    var userAccounts=await accounts.find({userId})
    res.json(userAccounts)
    
})
router.post("/disconnect/:id",async (req,res)=>{
    var {userId}= req.session
    var {id}= req.params
    var userAccount=await accounts.findById(id)
    if(userAccount.userId==userId &&req.cookies.SESSION==userAccount.userId){
       await  accounts.deleteById(id)
       res.json("Account Deleted")
    } 
    
})
module.exports=router