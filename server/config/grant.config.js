

module.exports = {
    server: {
        protocol: "http",
        host: "localhost:3000",   
        state: true
      },
      google:{
          key:process.env.googleKey,
          secret:process.env.googleSecret,
          callback:"/google/callback",
          scope:[
              "https://www.googleapis.com/auth/plus.me",
              "https://www.googleapis.com/auth/userinfo.email",
              "https://www.googleapis.com/auth/drive",
          ],
          custom_params: {access_type: "offline",prompt: 'consent'}
      },
      dropbox:{
        key:'1qphscwx4b0pqto',
        secret:'jc00gulufhcdqbw',
        callback:"/dropbox/callback",
        
    }

}