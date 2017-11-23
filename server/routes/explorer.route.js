
const express = require('express')
const axios = require('axios').default
const {getServiceForAccount}= require('../explorers');
const router= express.Router()
const accounts= require('../models/account.model');


/* router.get('/:id',async function (req, res) {

    try {
        var {id}= req.params
        var service= await getServiceForAccount(id)
        var files= await service.listFiles()
        res.json({folder:"",files})
    } catch (error) {
        console.log(error)
    }
    
    
    
}) */
router.get('/:id/:folderId?',async function (req, res) {
    

    try {
        var {id,folderId}= req.params
        var service= await getServiceForAccount(id)
        var files= await service.listFiles(folderId)
        var folder= await service.getFolderById(folderId)
        res.json({folder,files})
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
       
        
})

router.get("/:id/file/:fileId",async function (req, res){
    var {id,fileId}= req.params
    var service=await getServiceForAccount(id)
    service.files.get({
        fileId: fileId,
        //alt: 'media'
    },function(err,resp){
        if(err){return res.send(err)}
        console.log(resp)
        res.end()
    })



})



module.exports=router