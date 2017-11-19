const {MongoClient, ObjectId} = require('mongodb')
module.exports = class Base {

    
    constructor(name) {
        this.name=name
    }
    async getCollection(){
        var db = await MongoClient.connect(process.env.CONNSTRING)
        return db.collection(this.name)
    }
    
    async insert(data) {
        return this.getCollection().then(c => c.insert(data))
    }
    async findById(id) {
        return this.getCollection().then(c => c.findOne({_id: ObjectId(id)}))
    }
    async deleteById(id) {
        return this.getCollection().then(c => c.deleteOne({_id: ObjectId(id)}))
    }
    async findOne(query) {
        return this.getCollection().then(c => c.findOne(query))
    }
    async find(query) {
        return this.getCollection().then(c => c.find(query).toArray())
    }

}