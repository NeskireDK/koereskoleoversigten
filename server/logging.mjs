import winston from "winston"

// Logging service
export const logger = winston.createLogger({
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

if (process.env.NODE_ENV === 'dev') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

console.log("Process running in " + process.env.NODE_ENV + " mode");