
const express = require('express')
const axios = require('axios').default
const router= express.Router()
const drive = require('../explorers/drive');
const accounts= require('../models/account.model');

const getServiceForAccount=async(id)=>{
    var token= await accounts.getTokenByAccountId(id)
    var test= await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo`,{params:{access_token:token.access_token}})
    return drive(token);
}

router.get('/:id',async function (req, res) {

    try {
        var {id}= req.params
        var service= await getServiceForAccount(id)
        service.files.list(function (err, resp) {
            // handle err and response
            if (err) {
            return console.log(err);
            }
            resp.files.forEach(file => {
                console.log(file.name)
            });
            res.json(resp.files)
        });
    } catch (error) {
        console.log(error)
    }
    
    
    
})
router.get('/:id/:folderId',async function (req, res) {
    
        var {id,folderId}= req.params
        var service= await getServiceForAccount(id)
        service.files.list({
            q:`'${folderId}' in parents`,
            //resource: { parents: [ folderId ] },    
        },function (err, resp) {
            // handle err and response
            if (err) {
              return console.log(err);
            }
            resp.files.forEach(file => {
                console.log(file.name)
            });
            res.json(resp.files)
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