


const Dropbox = require('dropbox')
const Explorer = require('./Explorer');
const fs = require('fs');
const { Writable } = require('stream');
module.exports= class  DropboxExplorer extends Explorer{
    //client: new Dropbox();
    constructor(token){
        super()
        var{access_token}=token
        this.client=new Dropbox({ accessToken: access_token });
    }
    getAccount(id){
        return this.client.usersGetAccount({account_id:id})
    }
    listFiles(folderId){
        const id= folderId||""
       return this.client.filesListFolder({path: id}).then(res=>res.entries)
        .catch(function(error) {
          console.log(error);
        });
    }
    async getFolderById(id){
       // id=id||"/"
        if(!id){
            return { id:"", name:"Root"}
        }
        const folder= await this.client.filesGetMetadata({path:id})
        return folder
    }

   async  uploadFile(file,folderId,onProgess){
        let stream= fs.createReadStream(file.path)
        let path=""
        if(folderId){
            let folder= await this.client.filesGetMetadata({path:folderId})
            path= folder.path_lower
        }
          
            let size=0
            let prog=0
            let session
            let client= this.client
            let writer= new Writable({       
                async write(chunk, encoding, next){
                    if(!session){
                        session=await client.filesUploadSessionStart({
                            contents:chunk
                        }).catch(err=>{
                            console.log(err)
                        })
                    }else{
                        await client.filesUploadSessionAppendV2({
                            contents:chunk,
                            cursor:{
                                session_id:session.session_id,
                                offset:size
                            }
                        })
                    }
                    size+=chunk.byteLength
                    prog+= chunk.length;
                    if(onProgess)
                        onProgess(Math.floor(prog / file.size * 100))
                    next()
                    
                },  
            })
            stream.on("end",async()=>{
                let result = await this.client.filesUploadSessionFinish({
                    commit:{
                        path:`${path}/${file.name}`,
                        mode:'add',
                    
                    },
                    cursor:{
                        session_id:session.session_id,
                        offset:size
                    }
                })
                console.log(result)
            })
            stream.pipe(writer)

           /*  let started= false
            stream.on('readable', async  ()=> {
                if(!started){
                    let chunk;
                    let sessionId
                    started=true
        
                    for (;;) {
                        chunk = stream.read()
                        if(chunk==null){break}
                        
                        if(!sessionId){
                            let session=await this.client.filesUploadSessionStart({
                                contents:chunk
                            }).catch(err=>{
                                console.log(err)
                            })
                            console.log(session)
                            sessionId=session.session_id
                        }else{
                            await this.client.filesUploadSessionAppendV2({
                                contents:chunk,
                                cursor:{
                                    session_id:sessionId,
                                    offset:size
                                }
                            })
                        }
                        size +=chunk.byteLength;


                    }
               
                    let m = await this.client.filesUploadSessionFinish({
                        commit:{
                            path:`${path}/${file.name}`,
                            mode:'add',
                        
                        },
                        cursor:{
                            session_id:sessionId,
                            offset:size
                        }
                    })
                    clg
                }
               

            }) */
    }


}


