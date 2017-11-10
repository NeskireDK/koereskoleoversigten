const express = require('express');
const path = require('path');
const database = require("./database");

const route = express();

// serve index file from static assets
route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

route.get("/api/test", async (req, res) => {
    let [data, metadata] = await database.execute("SELECT * FROM `admin` where id = ?", [1]);
    res.json({
        data,
        metadata
    })
});

// handle all api requests
route.get("/api/example", (req, res) => { // this is just an example
    res.json({content: "example"});
});

// handle unmatched api requests before serving static assets
route.all("/api/*", (req, res) => {
    res.status(404);
    res.json({status: "error"})
});

// anything else is found in the static folder
route.use('/', express.static(__dirname + '/../static'));


// start the server
(async ()=>{
    await database.createPool();
    route.listen(80);
})();



