const Dropbox = require('dropbox')
const Explorer = require('./Explorer');

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
       return this.client.filesListFolder({path: ''}).then(res=>res.entries)
        .catch(function(error) {
          console.log(error);
        });
    }
    async getFolderById(id){
        const folder= await this.client.filesGetMetadata({path:id})
        return folder
    }


}


