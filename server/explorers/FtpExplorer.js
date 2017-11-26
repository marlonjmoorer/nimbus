const FtpClient = require('ssh2-sftp-client');
const Explorer = require('./Explorer');

module.exports= class  FtpExplorer extends Explorer{
    //client: new Dropbox();
    
    constructor(token){
        super()
        this.client=new FtpClient()
        this.client.connect(token)
        this.token=token
    }
    getAccount(id){
        //return this.client.usersGetAccount({account_id:id})
    }
    async listFiles(path){
       path= path||"/"
       await this.client.connect(this.token)
       return this.client.list(path)
    }
    async getFolderById(id){
        const folder= await this.client.filesGetMetadata({path:id})
        return folder
        
    }
    


}

