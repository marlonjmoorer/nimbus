
const express = require('express')
const axios = require('axios').default
const explorers = require('../explorers');

const router= express.Router()

const accounts= require('../models/account.model');

const getServiceForAccount=async(id)=>{
    var acc= await accounts.findById(id)
    return explorers(acc.type,acc.token)
}


router.get('/:id',async function (req, res) {

    try {
        var {id}= req.params
        var service= await getServiceForAccount(id)
        var files= await service.listFiles()
        res.json({folder:"",files})
    } catch (error) {
        console.log(error)
    }
    
    
    
})
router.get('/:id/:folderId',async function (req, res) {
    
        var {id,folderId}= req.params
        var service= await getServiceForAccount(id)
        service.files.list({
            q:`'${folderId}' in parents`,  
        },function (err, resp) {
            // handle err and response
            if (err) {
              return console.log(err);
            }
            resp.files.forEach(file => {
                console.log(file.name)
            });
            res.json({folder:'',files:resp.files})
        }); 
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