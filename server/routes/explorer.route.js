const express = require('express')
const axios = require('axios').default
const formidable = require('formidable');
const multer = require('multer');
const {getServiceForAccount}= require('../explorers');
const router= express.Router()
const accounts= require('../models/account.model');
const socket= require('../socket')
const ExternalStorage = require('../explorers/ExternalStorage');

const upload= multer({
    storage:ExternalStorage,
    highWaterMark:1*1024*1024
})

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

router.post("/upload",upload.single('file'),async(req,res)=>{
   
    /* try { 
        let io= socket.getServer()
        let form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files)=> {
            let service= await getServiceForAccount(fields.accountId)
            console.log('object')
            let channel=io.of(`/${files.file.id}`)
            channel.on("connection",()=>{
              //  console.log('test')
            })
            res.end()
            service.uploadFile(files.file,fields.folderId,(percent)=>{
                console.log(percent+'%')
                channel.emit("progress",percent)
            })
        });
    } catch (error) {
        console.log(error)
        res.end()
    } */
    res.end()
})


module.exports=router