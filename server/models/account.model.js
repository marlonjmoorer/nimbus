const BaseModel = require('./baseModel');
class AccountModel extends BaseModel {

    constructor() {
        super("account")
    }
}
module.exports = new AccountModel()