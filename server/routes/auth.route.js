
const express = require('express')
const db = require('../database');
const router= express.Router()
const google = require('googleapis');
const config = require('../config').grant["google"]

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.key,config.secret, "http://localhost"+config.callback)

const auth=(req,res,next)=>{
     if(req.session.user){
         next()
     }else{
         res.status(401).send("Not Authorized, Please sign in")
     }
}
//router.use(auth)
router.get('/google/callback',async function (req, res) {

    var {id}= req.session.user
    console.log(req.query)

        oauth2Client.credentials = req.query;        
        var drive=google.drive({
            version:'v3',
            auth: oauth2Client
       });
       drive.files.list(function (err, result) {
           if (err) {
             console.error(err);
             //process.exit();
           }
       
           console.log(result.files);
          // process.exit();
         }); 
       res.end(JSON.stringify(req.query, null, 2))
    
})

module.exports=router