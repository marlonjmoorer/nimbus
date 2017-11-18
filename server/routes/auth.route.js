
const express = require('express')
const db = require('../database');
const router= express.Router()


const auth=(req,res,next)=>{
     if(req.session.user){
         next()
     }else{
         res.status(401).send("Not Authorized, Please sign in")
     }
}

router.get("/isLoggedIn",(req,res)=>{
   res.json(req.session.user!=null)
})

router.get('/google',auth, function (req, res) {
    if(req.session.user){
      return  res.redirect('/connect/google')
    }
    return res.status(401).send("Not Authorized, Please sign in")
})

router.get('/connect/google/callback', function (req, res) {
    var {id}= req.session.user
    console.log(req.query)
    res.end(JSON.stringify(req.query, null, 2))
})

module.exports=router