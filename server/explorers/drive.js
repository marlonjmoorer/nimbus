const google = require('googleapis');
const { google: g } = require('../config/grant.config');
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(g.key,g.secret,g.callback)
module.exports=(token)=>{
    
    oauth2Client.setCredentials(token)
    const drive= google.drive({
        version: 'v3',
        auth: oauth2Client
    });
    return drive
}