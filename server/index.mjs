import express from "express"
import winston from "winston"
import bodyParser from "body-parser"
import path from 'path'
import * as database from './database'
// Routes  - Initialize Express and Import routes. 
const route = express();
route.use( bodyParser.json() );

import adminRoute from './routes/adminRoute'
adminRoute.Initialize(route)

import courseRoute from './routes/courseRoute'
courseRoute.Initialize(route)


const __dirname = "/usr/src/app/server";

// Logging service
let logger = winston.createLogger({
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

console.log = (...args) => logger.info(...args);
console.info = (...args) => logger.info(...args);
console.warn = (...args) => logger.warn(...args);
console.error = (...args) => logger.error(...args);
console.debug = (...args) => logger.debug(...args);

//
console.log("Process running in " + process.env.NODE_ENV + " mode")
if (process.env.NODE_ENV === 'dev') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// allow json via body-parser
// serve index file from static assets
route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
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



