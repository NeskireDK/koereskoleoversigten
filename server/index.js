import express from "express"
import winston from "winston"
import bodyParser from "body-parser"
import path from 'path'
import * as database from './database'
// Models
import Admin from './model/admin';

const route = express();
const __dirname = "/usr/src/app/server";

// Logging service
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.Console({ colorize: true }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}



// allow json via body-parser
route.use( bodyParser.json() );
// serve index file from static assets
route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});
// Get All admins
route.get("/api/admin", async (req, res) => {
    let a = await Admin.getAll()
    res.json({
        data : a[0],
    })
    console.log("Hello getting all admins!")
});
// Get single admin per id
route.get("/api/admin/:id", async (req, res) => {
    let a = await Admin.get(req.params.id)
    res.json({
        data : a,
    })
    logger.log({
        level: 'info',
        message: `Specific Admin was fetched: ${req.params.id}!`
    });
});
// Insert admin via Post
route.post("/api/admin/", async (req, res) => {
    res.json({
        res: await Admin.insert(req.body.name,req.body.email,req.body.password)
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



