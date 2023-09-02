import * as winston from 'winston';
import * as moment from 'moment';
import { getJwtPayloadUserDetails } from "./authUtils";

const { combine, simple, timestamp, colorize, printf } = winston.format;

/**
 * Create a colorized logger with specific formatting
 */
const colorizer = colorize();
const logger = winston.createLogger({
    format: combine(
        timestamp(),
        simple(),
        printf(msg => colorizer.colorize(msg.level, `[${msg.level.toUpperCase()}]: ${msg.message}`))
    ),
    transports: [
        new winston.transports.Console(),
    ]
});

/**
 * Common logging utility
 *
 * @param type - Type of log (info, error, etc.)
 * @param req - Express request object
 * @param error - Error object (if any)
 */
async function logging(type: string, req?: any, error?: any) {
    const logTime = moment().format('dddd MM [de] YYYY HH:mm:ss');
    const logMsg = req 
        ? `${logTime} [${req.method.toUpperCase()}]: ${req.url} ${req.message}` 
        : `${logTime} ${error.message}`;
    
    logger.log(type, logMsg);
}

export const log = {
    /**
     * Info logger which extracts and includes user details from JWT token.
     *
     * @param req - Express request object
     */
    async info(req: any) {
        const payloadUser: any = await getJwtPayloadUserDetails(req);
        const resp = {
            method: req.method,
            url: req.originalUrl,
            message:  `\n[${payloadUser.type || 'public'}]: name: ${payloadUser.name || 'public'} (${payloadUser.email || 'public'})`
        };
        logging('info', resp);
    },

    /**
     * Error logger
     *
     * @param error - Error object
     */
    error(error: any): void {
        logging('error', undefined, error);
        console.info('---- END --');
    },

    /**
     * Success logger
     *
     * @param str - Success message
     */
    success(str: string): void {
        logger.info(str);
        console.info('---- END --');
    }
}

/**
 * Simplified info logger
 *
 * @param str - Info message
 */
export function logInfo(str: string) {
    logger.info(str);
}

/**
 * Simplified error logger
 *
 * @param str - Error message
 */
export function logError(str: string) {
    logger.error(str);
}