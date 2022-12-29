const { connector } = require('../db/connector');
const { Table } = require('./table');
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

    findOne( criteria, callback ){
        connector( dbo => {
            dbo.collection(this.name).findOne(criteria, ( err, result ) => {
                callback(result);
            })
        })
    }

    insertOne( data, callback ){
        connector( dbo => {
            const tb = new Table(this.name);

            tb.getFieldsByName( (fields) => {
                const keys = fields.keys;
                let criteria = {};
                for( let i = 0; i < keys.length; i++ ){
                    criteria[keys[i]] = data[keys[i]];
                }

                this.findOne( criteria, (result) => {
                    if( result ){
                        callback(false)
                    }else{
                        dbo.collection(this.name).insert( data, (err, result) => {
                            callback(true)
                        })
                    }
                })

            })
            
        })
    }
}


module.exports = {
    Model,
}
