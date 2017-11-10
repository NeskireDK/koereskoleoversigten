const express = require('express');
const path = require('path');
const database = require("./database");


const app = express();

// serve index file from static assets
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

app.get("/api/test", async (req, res) => {
    const [data, metadata] = await database.execute("SELECT * FROM `test` where id = ?", [1]);

    res.json({
        data,
        metadata
    })

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
(async ()=>{
    await database.createPool();
    app.listen(80);
})();



