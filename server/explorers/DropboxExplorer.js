
const Dropbox = require('dropbox')
const Explorer = require('./Explorer');
const fs = require('fs');
const {Writable, Transform, PassThrough} = require('stream');
module.exports = class DropboxExplorer extends Explorer {
    //client: new Dropbox();
    constructor(token) {
        super()
        var {access_token} = token
        this.client = new Dropbox({accessToken: access_token});
    }
    getAccount(id) {
        return this
            .client
            .usersGetAccount({account_id: id})
    }
    listFiles(folderId) {
        const id = folderId || ""
        return this
            .client
            .filesListFolder({path: id})
            .then(res => res.entries)
            .catch(function (error) {
                console.log(error);
            });
    }
    async getFolderById(id) {
        // id=id||"/"
        if (!id) {
            return {id: "", name: "Root"}
        }
        const folder = await this
            .client
            .filesGetMetadata({path: id})
        return folder
    }

    async uploadFile2(file, folderId, onProgess, onComplete) {
        let stream = file.stream
        let path = ""
        if (folderId) {
            let folder = await this
                .client
                .filesGetMetadata({path: folderId})
            path = folder.path_lower
        }

        let size = 0
        let prog = 0
        let session
        let client = this.client

    
        let bufs = []
        stream.on("end", async() => {
            let result=await  this.client.filesUpload({path:`${path}/${file.originalname}`,contents:Buffer.concat(bufs)})
            console.log("done")
        }).on('data',(chunk)=>{
            bufs.push(chunk)
        }).on("readable",()=>stream.read())

      
    }

    async uploadFile(file, folderId, onProgess, onComplete) {
        let stream = fs.createReadStream(file.path, {
            highWaterMark: 1 *1024 * 1024
        })
        let path = ""
        if (folderId) {
            let folder = await this
                .client
                .filesGetMetadata({path: folderId})
            path = folder.path_lower
        }

        let size = 0
        let prog = 0
        let session
        let client = this.client

        let writer = new Writable({

            async write(chunk, encoding, next) {
                if (!session) {
                    session = await client
                        .filesUploadSessionStart({contents: chunk, close: false})
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    await client
                        .filesUploadSessionAppendV2({
                        contents: chunk,
                        cursor: {
                            session_id: session.session_id,
                            offset: size
                        }
                    })
                        .catch(err => {
                            console.log(err)
                        })
                }
                size += chunk.length
                prog += chunk.length;
                if (onProgess) 
                    onProgess(Math.floor(prog / file.size * 100))
                next()

            }
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
                }).catch(err=>{
                    console.log(err)
                })
                if(onComplete){
                    onComplete()
                }
                console.log(result)
        }) 

       
        let buf = []
        stream.pipe(writer)

      
    }


}
