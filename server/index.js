const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');


const app = express();

// serve index file from static assets
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

app.get("/api/test", async (req, res) => {
    const connection = await mysql.createConnection({
        host: '188.166.20.243',
        user: 'webapp',
        password: 'fuckwindows',
        database: 'test'
    });
    const [rows, fields] = await connection.execute("SELECT * FROM `test`");

    res.json(rows)
    res.json(fields)

});

// handle all api requests
app.get("/api/example", function (req, res) { // this is just an example
    res.json({content: "example"});
});

// handle unmatched api requests before serving static assets
app.all("/api/*", function (req, res) {
    res.status(404);
    res.json({status: "error"})
});

// anything else is found in the static folder
app.use('/', express.static(__dirname + '/../static'));


// start the server
app.listen(80);



