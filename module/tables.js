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

    remove( id, callback ){
        connector( dbo => {
            dbo.collection("relations").remove({ id: id }, (err, result) => {
                callback(result);
            })
        } )
    }
}

module.exports = {
    Tables,
}
