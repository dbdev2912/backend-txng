const { connector } = require('../db/connector');

class Model {
    constructor( name ){
        this.name = name
    }

    get( callback ){
        connector( dbo => {
            dbo.collection(this.name).find({}).toArray((err, result) => {
                callback(result);
            })
        })
    }

    insertOne( data, callback ){
        connector( dbo => {
            dbo.collection(this.name).insert( data, (err, result) => {
                callback(result);
            })
        })
    }
}


module.exports = {
    Model,
}
