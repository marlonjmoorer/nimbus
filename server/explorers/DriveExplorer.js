const fs = require('fs');
const {promisify} = require('util');
const Explorer = require('./Explorer');
const GoogleDrive = require("googledrive");
const { key,secret } = require('../config/grant.config').google


const client={
    installed: {
      "client_id":key,
      "client_secret":secret,
      "redirect_uris": [],
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token"
    }
}

module.exports= class  DriveExplorer extends Explorer{

    constructor(token){
        super()
        this.client=new GoogleDrive({client,token})
        
        
    }
    getAccount(id){
       // return this.client.usersGetAccount({account_id:id})'

       //this.client.createFile()
    }
    async listFiles(folderId){
        const id= folderId||"root"
       let folder= await this.client.getFolderById(id)
       let files=await folder.getChildren()

       return files.map(i=>i.resource)
      
    }
    async getFileById(id){
       return this.client.getFileById(id)
    }
    async getFolderById(id){
        id=id||"root"

       let folder =await this.client.getFolderById(id)

       return folder.resource
    }
    async uploadFile(file,folderId,onProgess,onComplete){

       
        let fileMetadata = {
            parents:[folderId],
            name:file.name,
            mimeType: file.type
        };
        let size=0
        let onData=(chunk)=>{
            size += chunk.length;
            if(onProgess)
                onProgess(Math.floor(size / file.size * 100))
        }
        let onEnd=()=>{
            if(onComplete)
                onComplete()
        }
        const folder = await this.client.getFolderById(folderId)
        const stub = folder.createChildFile(fileMetadata);
        await stub.resumableCreate({
            contentLength: file.size,
            readableCallback: position => 
                 fs.createReadStream(file.path,{ start: position })
                .on("data",onData)
        });
        return stub.id
    }
}