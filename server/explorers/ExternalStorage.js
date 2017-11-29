const { getServiceForAccount } = require('./index');


class ExternalStorage{

    async _handleFile (req, file, cb) {
        let{ accountId,folderId}=req.body
        let service= await getServiceForAccount(accountId)
        service.uploadFile(file,folderId,(percent)=>{ 
            console.log(percent+'%')
        },(err)=>{
           cb(err,{}) 
        })
    }
}

module.exports= new ExternalStorage()