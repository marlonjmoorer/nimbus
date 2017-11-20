var dotenv = require('dotenv')
var fs=require("fs")
var config = dotenv.parse(fs.readFileSync('./.env'))


module.exports= config