var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

app.get("/api", function (reg, res) {
    res.send("test");
});


app.use('/', express.static(__dirname + '/../static'));

app.listen(80);