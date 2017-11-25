const fs = require('fs');
const {promisify} = require('util');
const Explorer = require('./Explorer');
const GoogleDrive = require("googledrive");
const { key,secret } = require('../config/grant.config').google
const {auth,drive} = require('googleapis')

/* const client={
    installed: {
      "client_id":g.key,
      "client_secret":g.secret,
      "redirect_uris": [g.callback],
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://accounts.google.com/o/oauth2/token"
    }
} */

module.exports= class  DriveExplorer extends Explorer{

    constructor(token){
        super()
        //this.client=new GoogleDrive({client,token})
        let oauth= new auth.OAuth2(key,secret)
        oauth.credentials=token
        this.client= drive({
            version: 'v3',
            auth:oauth
        })
        this.oauth=oauth
        
    }
    getAccount(id){
       // return this.client.usersGetAccount({account_id:id})'

       //this.client.createFile()
    }
    async listFiles(folderId){
        const id= folderId||"root"
       let result= await promisify(this.client.files.list)({
            q:`'${id}' in parents`
        })
        return result.files
      
    }
    async getFileById(id){
       return this.client.getFileById(id)
    }
    async getFolderById(id){
        id=id||"root"

       let folder =await promisify(this.client.files.get)({
        fileId:id
       })
       return folder
       // this.client.files.get()
    }
    async uploadFile(file,folderId,onProgess,onComplete){

        let stream= fs.createReadStream(file.path)
        let fileMetadata = {
            parents:[folderId],
            name:file.name,
            ///mimeType: file.type
        };
        let media = {
           mimeType: file.type,
           body: stream
        };
        let headers={
            'X-Upload-Content-Length':file.size,
            'X-Upload-Content-Type':file.type,
            'Content-Type':'application/json; charset=UTF-8',
           // 'Content-Length': 38
        }
        let size= 0
        stream.on("data",(chunk)=>{
            size += chunk.length;
            if(onProgess)
                onProgess(Math.floor(size / file.size * 100))
        }).on("end",()=>{
            if(onComplete)
                onComplete()
        }).on("error",()=>{
           // console.log('error')
        })
        
        this.oauth.request({
            url:"https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
            method:"POST",
            headers,
            json: true,
            body:fileMetadata
        },(err,res,body)=>{
            console.log("object")
            let {location}=body.headers
            this.oauth.request({
                url:location,
                method:'PUT',
                headers:{
                    "Content-Length":file.size
                },
                body:stream
            },(err,res,body)=>{
                console.log("object")
            })
        })
        this.client.files.create({
             resource: fileMetadata,
            // uploadType:'resumable',
            // headers,
             media
             //body:fileMetadata
         },(err,result,res,test)=>{
             console.log(result)
             console.log(res.location)

            /*  this.client.files.update({
                uploadType:'resumable',
             }) */

         })
       //stream.pipe(req)
      /*  let result= await promisify(this.client.files.update)({
            fileId:stub.id,
            resource:fileMetadata,
            addParents: folderId,
        }).catch(err=>{
            console.log(err)
        })
        return result */
    }
}