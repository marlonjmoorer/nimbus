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
       // return this.client.usersGetAccount({account_id:id})
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
}