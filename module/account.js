const { connector } = require('../db/connector');
class Account{
    constructor( username, password ){
        this.username = username;
        this.password = password;
    }

    login( callback ){
        const { username, password } = this;
        connector( (dbo) => {
            dbo.collection("accounts").findOne({ username, password }, (err, result) => {
                const account = {...result, password: ""};
                let code = 200;
                if( !result ){
                    code = 404;
                }
                callback(code, account);
            })
        })
    }
}

module.exports = {
    Account
}
