process.on('uncaughtException', function (err) {
    debugger
    console.log('Caught exception: ', err);
});

// import "./logging"
import express from "express"
import bodyParser from "body-parser"
import path from 'path'
import * as database from './database'
import * as middleware from './middleware.mjs';
import v from "./validate";
import * as utils from "./utils"


// import routes
import adminRoute from './routes/adminRoute'
import courseRoute from './routes/courseRoute'
import schoolRoute from './routes/schoolRoute'
import courseModuleRoute from './routes/courseModuleRoute'


const __dirname = "/usr/src/app/server";

// Routes  - Initialize Express and Import routes.
const route = express();
route.use(bodyParser.urlencoded({extended: false}));
route.use(bodyParser.json());

// initialize routes
adminRoute.Initialize(route);
courseRoute.Initialize(route);
schoolRoute.Initialize(route);
courseModuleRoute.Initialize(route);


// handle all api requests
route.get("/api/example", (req, res) => { // this is just an example
    res.json({content: "example"});
});

route.get("/api/secure_example", middleware.driverschoolAuthentication, (req, res) => { // this is just an example
    res.json({content: "example 2", user: req.user});
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

    if (utils.isProductionEnvironment()) {
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
    console.log("Server is running")
})();



