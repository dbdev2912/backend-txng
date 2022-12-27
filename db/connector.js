const { MongoClient } = require('mongodb');
const connectionString = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";

const dbName="txng";

module.exports = {
    connector: (callback) => {
        MongoClient.connect(connectionString, function(err, db) {
            if (err) throw err;
            const dbo = db.db(dbName);
            callback(dbo);
        })
    }
}
