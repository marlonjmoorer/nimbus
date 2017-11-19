const {MongoClient,ObjectId} = require('mongodb')
const BaseModel = require('./baseModel');

class UserModel extends BaseModel{

    constructor(){
        super("user")
    }
}
module.exports= new UserModel()
