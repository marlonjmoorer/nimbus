const express = require('express')
const axios = require('axios').default;
const FtpClient = require('ssh2-sftp-client');
const AWS = require('aws-sdk');
const users= require('../models/user.model')
const accounts= require('../models/account.model');
const router = express.Router()
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

router.post("/ftp/signin",async(req,res)=>{
    console.log("")
    let{host,port,key,username,password}=req.body
    var client= new FtpClient()
    try {
        await client.connect({host,port,privateKey:key,username,password})
        let account= await accounts.findOne({host,username})
        if(!account){
           await accounts.insert({
               host,
               type:"ftp",
               username,
               email:username,
               userId:req.session.userId,
               token:{
                    host,
                    privateKey:key,
                    password,
                    username,
                    port
               }
           })
           res.redirect('/#/dashboard');
        }
        res.end()
    } catch (error) {
        res.status(500).send(error.message)
    } 
})

router.get('/amazon/callback',async function (req, res) {
    let token=req.query
    const credentials = new AWS.WebIdentityCredentials({
        RoleArn: '',
        ProviderId: 'www.amazon.com',
        WebIdentityToken: token.access_token
    });
    
    var s3= new AWS.S3({
        credentials,
        params: {Bucket: 'mmoorer',Region:"us-east-1"}
    })
    s3.listObjects({Delimiter:"/uploads"}).promise().then(r=>{
        console.log(r)
    })
    res.redirect('/');
});

module.exports = router