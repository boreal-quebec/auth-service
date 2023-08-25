import {format} from "winston";

const winston = require('winston');

let options = {
    level: 'debug',
    winston: {
        level: 'debug',
        format: winston.format.json(),
        defaultMeta: { service: 'auth-service' },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' }),
        ],
    }
}

if (process.env.NODE_ENV !== 'production') {
    options.winston.transports.push(new winston.transports.Console({
        format: format.combine(
            winston.format.simple(),
            winston.format.colorize({ all: true }),

        ),
    }));
}


export const loggerOptions = {
    type: "Winston",
    options: options
};

export const logger = winston.createLogger(options.winston)