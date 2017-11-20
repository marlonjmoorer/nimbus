const BaseModel = require('./baseModel');
class AccountModel extends BaseModel {

    constructor() {
        super("account")
    }
   async getTokenByAccountId(id){
        var result=await this.findById(id).then(acc=>acc.token)
        return result;
    }
}

module.exports = new AccountModel()