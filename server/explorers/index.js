
const Explorer = require('./Explorer');
const DropboxExplorer = require('./DropboxExplorer');
const DriveExplorer = require('./DriveExplorer');

module.exports=(type,token)=>{
    switch(type){
        case "drive": return new DriveExplorer(token)
        case "drop":return new DropboxExplorer(token)
        //case "ftp": return null
        default: return new Explorer()
    }
}