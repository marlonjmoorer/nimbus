const Explorer = require('./Explorer');
const DropboxExplorer = require('./DropboxExplorer');

module.exports=(type)=>{
    switch(type){
        case "": return new Explorer()
        case "gg":return new DropboxExplorer()
        case "lo": return 3
    }
}