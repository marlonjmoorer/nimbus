const MongoClient = require('mongodb').MongoClient
const config = require('./config');
const collection=async(name)=>{
    var db= await MongoClient.connect(config.CONNSTRING)
    return db.collection(name)
}

module.exports={
    collection,
    connect:()=>{
        return MongoClient.connect(config.CONNSTRING)
    }
}