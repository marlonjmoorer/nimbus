const express = require('express')
const axios = require('axios').default
const formidable = require('formidable');
const shortid = require('shortid');
const {getServiceForAccount}= require('../explorers');
const router= express.Router()
const accounts= require('../models/account.model');
const socket= require('../socket')
const task = require('../task');


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

router.post("/upload",async(req,res)=>{
   
    try {
        let io= socket.getServer()
        let form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files)=> {
            let jobId= shortid()
            let {accountId,folderId}=fields
            let jobData={
                accountId,
                folderId,
                file:files.file,
                jobId
            }
            task.now("upload",jobData,(err,job)=>{
               if(err){throw err}
               res.json({jobId})
            })
        });
    } catch (error) {
        console.log(error)
        res.end()
    }
})


module.exports=router