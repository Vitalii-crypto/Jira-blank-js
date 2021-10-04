import winston from 'winston';

const env = process.env.NODE_ENV || 'development'
const isDevelopment = env === 'development'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    return isDevelopment ? 'debug' : 'warn'
}

const format = winston.format.combine(
    // winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
        (info) => {
            if (isDevelopment || true) { // console.log enabled
                // console.log(info);
            }
            console.log(info)
            // @ts-ignore
            return `${info.timestamp} ${info.level}: ${typeof info.message === "string" ? info.message : info[Symbol.for("splat")]}`; // out to log
        },
    ),
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({
        filename: 'logs/all.log'
    }),
]

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default logger;
