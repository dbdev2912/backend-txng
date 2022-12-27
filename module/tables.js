const { connector } = require('../db/connector');

class Tables{

    constructor(){
        this.tables = [];
    }

    getAll( callback ){
        connector( (dbo) => {
            dbo.collection("relations").find({}).toArray( (err, result) => {
                this.set(result);
                callback(result);
            })
        })
    }

    set( tableList ){
        this.tables = tableList
    }
    save(){
        /* saving to db */
    }
}

module.exports = {
    Tables,
}
