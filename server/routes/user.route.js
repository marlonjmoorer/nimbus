const express = require('express')
const db = require('../database');
const router= express.Router()
var bcrypt = require('bcrypt');
const saltRounds =10

router.post("/signup",async(req,res)=>{
   const {email ,password}=req.body
    var users= await db.collection("user")
    if(!email ||!password){return res.status(500).json({message:"Invalid data"}) }
    var exist=await users.findOne({email})
    if(exist){
        return res.status(409).json({message:"User Already Exist!"})
    }
    const encrypted= bcrypt.hashSync(password,saltRounds)
    var result= await users.insert({email,password:encrypted})
    if(result.insertedCount==1){
       return res.json({success:true,message:"User signup sucessful!"})
    }
    res.end()
})

router.post("/login",async(req,res)=>{
    const {email ,password}=req.body
    var users= await db.collection("user")
    if(!email ||!password){return res.status(500).json({message:"Invalid data"}) }
    var user=await users.findOne({email})
    if(user){
        if(bcrypt.compareSync(password,user.password)){
            req.session.user=user
            res.cookie("SESSION", user._id, {maxAge:1*24*60*60*1000})
            return res.json({message:"Login Successful"})
        }else{
            return res.status(500).json({message:"Invalid password"})
        }
    }else{
        return res.status(500).json({message:"User Doesn't Exist!"})
    }
})


router.get('/logout', (req, res, next) =>{
    if (req.session) {
      // delete session object
      req.session.destroy((err)=> {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
});
module.exports=router;