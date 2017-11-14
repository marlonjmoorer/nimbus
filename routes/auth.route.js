
const express = require('express')
const db = require('../database');
const router= express.Router()


router.use((req,res,next)=>{
     if(req.session.user){
         next()
     }else{
         res.status(401).send("Not Authorized, Please sign in")
     }
})
router.get('/google/attach', function (req, res) {
    if(req.session.user){
        res.redirect('/connect/google')
    }
})

router.get('/google/callback', function (req, res) {
    var {id}= req.session.user
    console.log(req.query)
    res.end(JSON.stringify(req.query, null, 2))
})

module.exports=router