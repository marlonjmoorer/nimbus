const Explorer = require('./Explorer');
const DropboxExplorer = require('./DropboxExplorer');
const DriveExplorer = require('./DriveExplorer');
const FtpExplorer = require('./FtpExplorer');
const accounts = require('../models/account.model');

const  getServiceByType=(type)=> {
    switch (type) {
        case "drive":
            return DriveExplorer
        case "drop":
            return DropboxExplorer
       case "ftp": 
            return FtpExplorer
        default:
            return Explorer
    }
}
const getServiceForAccount=async(id)=>{
    const acc= await accounts.findById(id)
    const Service= getServiceByType(acc.type)
    return new Service(acc.token)
}


module.exports = {
    getServiceForAccount
}