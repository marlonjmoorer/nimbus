const MongoClient = require('mongodb').MongoClient
module.exports={
    connect:()=>{
        return MongoClient.connect(process.env.CONNSTRING)
    }
}