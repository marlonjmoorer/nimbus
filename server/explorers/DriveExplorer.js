const fs = require('fs');
const Explorer = require('./Explorer');
const GoogleDrive = require("googledrive");
const { google: g } = require('../config/grant.config');

const client={
    installed: {
      "client_id":g.key,
      "client_secret":g.secret,
      "redirect_uris": [g.callback],
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token"
    }
}

module.exports= class  DriveExplorer extends Explorer{
    //client: new Dropbox();
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
        const rootFolder = await this.client.getFolderById(id);
            // Find files in root folder
        const childFiles = await rootFolder.getChildren();
        return childFiles.map(i=>i.resource)
    }
    async getFileById(id){
       return this.client.getFileById(id)
    }
    async getFolderById(id){
        id=id||"root"
       var folder=await  this.client.getFolderById(id)
       return folder.resource
    }
    async uploadFile(file,stream){
        var folder=await  this.client.getFolderById("root")
        const newFile = folder.createChildFile({
            name: file.name,
            mimeType: file.type|| 'application/octet-stream'
        });
        const result=await newFile.resumableCreate({
            contentLength: file.size,
            readableCallback: position => stream
        }).catch(err=>{
            console.log(err)
        })
        return ""
    }
}