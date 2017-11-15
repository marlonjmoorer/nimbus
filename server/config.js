var dotenv = require('dotenv')
var fs=require("fs")
var config = dotenv.parse(fs.readFileSync('./server/.env'))
config.grant={
        "server": {
          "protocol": "http",
          "host": "localhost:3000"
        },
        "google":{
            "key":config.googleKey,
            "secret":config.googleSecret,
            "callback":"/google/callback",
            "scope":[
                "https://www.googleapis.com/auth/drive"
            ]
        }
    }

module.exports= config