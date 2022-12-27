const express = require('express');

const secret = require('./secret');
const { connector } = require('./db/connector.js');
const mongo = require('mongodb');

const cors = require('cors');
const app = express()

// const { cropIMG } = require('./templates/img/cropImage.js');


const { Account } = require('./module/account');
const { Tables } = require('./module/tables');
const { Table } = require('./module/table');
const { Field } = require('./module/field');
/* middlewares */

app.use(require('cookie-parser')(secret.cookie));
app.use(require('express-session')());
app.use( express.static('public') );
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
}));

app.use( bodyParser.json({ limit: "50mb" }) );

app.get('/', (req, res) => {
    res.send({ msg: "Hello World" });
})

app.get('/api/session/check', (req, res) => {
    const credential = req.session.credential;
    if( credential ){
        res.send({ isSigned: true, credential })
    }else{
        res.send({ isSigned: false, credential })
    }
})

app.get('/api/signout', (req, res) => {
    delete req.session.credential;
    res.send({ success: true })
})


app.get('/api/tables', (req, res) => {
    const tables = new Tables();
    tables.getAll( ( list ) => {        
        res.send({ tables: list  })
    })
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    const account = new Account(username, password);
    account.login( (code, result) => {
        const response = {
            code,
            credential: result,
        }

        if( code === 200 ){
            req.session.credential = result;
        }
        res.send(code,  response )
    })
})

app.post('/api/models/new/table', (req, res) => {
    const { name } = req.body;
    const relation = new Table( name, [], [], [] );
    relation.save( (id) => {
        res.send({ id ,success: true})
    });
})


app.use((req, res, next) => {
    res.send(404, { msg: "404 not found" });
})
app.listen(5000, ()=>{
    console.log("Server running on www://ws:5000");
});
