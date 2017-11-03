const express = require('express');
const path = require('path');

const app = express();

// serve index file from static assets
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

// handle all api requests
app.get("/api/example", function (reg, res) { // this is just an example
    res.json({content: "example"});
});

// handle unmatched api requests before serving static assets
app.all("/api/*", function (reg, res) {
    res.status(404);
    res.json({status: "error"})
});

// any thing else is found in the static folder
app.use('/', express.static(__dirname + '/../static'));

// start the server
app.listen(80);


