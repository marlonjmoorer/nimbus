const Explorer = require('./Explorer');
const DropboxExplorer = require('./DropboxExplorer');
const DriveExplorer = require('./DriveExplorer');
const FtpExplorer = require('./FtpExplorer');

module.exports = {
    getServiceByType(type) {
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
}