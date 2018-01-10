import express from "express"
import winston from "winston"
import bodyParser from "body-parser"
import path from 'path'
import * as database from './database'
import * as middleware from './middleware.mjs';
import v from "./validate";

// import routes
import adminRoute from './routes/adminRoute'
import courseRoute from './routes/courseRoute'


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
        new winston.transports.Console({colorize: true}),
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
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

console.log("Process running in " + process.env.NODE_ENV + " mode");
if (process.env.NODE_ENV === 'dev') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}


// Routes  - Initialize Express and Import routes.
const route = express();
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

adminRoute.Initialize(route);
courseRoute.Initialize(route);


// handle all api requests
route.get("/api/example", (req, res) => { // this is just an example
    res.json({content: "example"});
});

route.post("/api/test", middleware.validatePost(v.validations.courseConstraints), (req, res) => {
    res.json({
        "jo": "hoo",
        "data": req.body
    });
});


// handle unmatched api requests before serving static assets
route.all("/api/*", (req, res) => {
    res.status(404);
    res.json({status: "error"})

});


const servePolymerApp = (folderName) => {
    let route = express();

    route.use("/assets", express.static(folderName + '/assets'));

    if (process.env.NODE_ENV !== 'dev') {
        folderName += "/build/default"
    }

    route.use("/bower_components", express.static(folderName + '/bower_components'));
    route.use("/src", express.static(folderName + '/src'));
    route.get("/manifest.json", (req, res) => {
        res.sendFile(path.resolve(folderName + '/manifest.json'));
    });
    route.use("/", (req, res) => {
        res.sendFile(path.resolve(folderName + '/index.html'));
    });

    return route
};
route.get("/validate.js", (req, res) => res.sendFile(path.resolve(__dirname + "/validate.js")));
route.use("/k", servePolymerApp(__dirname + "/../static_driverschool"));
route.use("/", servePolymerApp(__dirname + "/../static_frontend"));


// start the server
(async () => {
    await database.createPool();
    route.listen(80);
})();



