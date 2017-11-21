const express = require('express')
const axios = require('axios').default;
const users= require('../models/user.model')
const accounts= require('../models/account.model');

const router = express.Router()
const google = require('googleapis');
const DropboxExplorer = require('../explorers/DropboxExplorer');


router.use(async(req, res, next) => {
    if (!req.session.userId && req.cookies.SESSION) {
       const exist = await users.findById(req.cookies.SESSION)
       if(exist){
           req.session.userId=exist._id
       }
    }
    next()
})
router.get('/dropbox/callback',async function (req, res) {
    let token=req.query
    let {account_id}= token.raw
    var {email}=await new DropboxExplorer(token).getAccount(account_id)
    let account= await accounts.findOne({email,userId:req.session.userId,type:"drop"})
    if(!account){
        await accounts.insert({
            email,
            token,
            type:"drop",
            userId:req.session.userId
        })
     }
    res.redirect('/');
});
router.get('/google/callback', async function (req, res) {
    try{
        
        let token=req.query
        let response= await axios.get("https://www.googleapis.com/oauth2/v1/tokeninfo",{params:{access_token:token.access_token}})
        let {email}=response.data
        let account= await accounts.findOne({email,userId:req.session.userId,type:"drive"})
        if(!account){
           await accounts.insert({
               email,
               token,
               type:"drive",
               userId:req.session.userId
           })
        }

        res.redirect('/#/dashboard');
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
   
})

module.exports = router