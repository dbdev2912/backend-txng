const { connector } = require('../db/connector');

class Table {
    constructor( name, fields = [], keys= [], foreign_keys=[] ){
        this.id = -1;
        this.name = name;
        this.fields = fields;
        this.keys = keys;
        this.foreign_keys = foreign_keys;
    }

    getData(){
        return {
            id:     this.id,
            name:   this.name,
            fields: this.fields,
            keys:   this.keys,
            foreign_keys: this.foreign_keys,
            create_on:    this.create_on
        }
    }

    getName(){
        return this.name;
    }
    getFields(){
        return this.fields;
    }
    getKeys(){
        return this.keys;
    }
    getForeignKeys(){
        return this.foreign_keys;
    }
    setId(id){
        this.id = id;
    }

    setName(name){
        this.name = name;
    }
    setFields( fields ){
        this.fields = fields;
    }
    setKeys( keys ){
        this.keys = keys;
    }

    setForeignKeys( keys ){
        this.foreign_keys = keys;
    }

    setDate( date ){
        this.create_on = date;
    }

    save( callback ){
        let _this = this;
        connector( dbo => {
            dbo.collection("auto_id").findOne({"name": "table_id"}, (err, result) => {
                let id;
                const date = new Date();
                _this.setDate(date)
                if(result){
                    id = result.id;
                    dbo.collection("auto_id").updateOne({"name": "table_id"}, { $set: { "id": id + 1 } }, (err, result) =>{
                        _this.setId(id)

                        dbo.collection("relations").insertOne({ ...this.getData()}, (err, result) => {
                            callback(id);
                        });
                    })
                }else{
                    id = 0;
                    _this.setId(id)
                    dbo.collection("auto_id").insertOne({"name": "table_id", "id": 0}, (err, result) => {
                        dbo.collection("relations").insertOne({ ...this.getData()}, (err, result) => {
                            callback(id);
                        });
                    })
                }
            })
        })
    }


    modify(callback){
        connector( (dbo) => {
            dbo.collection("relations").updateOne({ "id": this.id }, { $set: { name: this.name, fields: this.fields, keys: this.keys, foreign_keys: this.foreign_keys } }, (err, result) => {
                if(err){
                    callback(500);
                }else{
                    callback(200);
                }
            })
        })
    }

    getFieldsByName( callback ){
        let name = this.name;
        connector(( dbo ) => {
            dbo.collection("relations").findOne({ "name": name }, (err, result) => {                
                callback(result);
            })
        });
    }
}

module.exports = {
    Table
}
