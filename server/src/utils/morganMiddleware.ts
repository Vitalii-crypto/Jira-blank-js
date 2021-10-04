//@ts-nocheck
import morgan from "morgan";
import logger from "./logger";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
    // Use the http severity
    write: (message, ...rest) => {
        return logger.http(message)
    },
};

morgan.token('userAccountId', (req) => {
    return req.context && req.context.userAccountId;
});

morgan.token('clientKey', (req) => {
    return req.context && req.context.clientKey;
});

morgan.token('error', (req) => {
    return req.error && (req.error.stack || req.error);
});

// Build the morgan middleware
const morganMiddleware = morgan(
    (tokens, req, res) => {
        // morgan message building
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.userAccountId(req, res),
            tokens.clientKey(req, res),
            tokens.res(req, res, 'content-length'),
            tokens['response-time'](req, res), "ms",
            tokens.error(req, res),
            tokens.status(req, res)
        ].join(" ");
    },
    // Define message format string (this is the default one).
    // The message format is made from tokens, and each token is
    // defined inside the Morgan library.
    // You can create your custom token to show what do you want from a request.
    // ":method :url :status :res[content-length] - :response-time ms",
    // Options: in this case, I overwrote the stream and the skip logic.
    // See the methods above.
    // @ts-ignore
    {stream}
);

export default morganMiddleware;
