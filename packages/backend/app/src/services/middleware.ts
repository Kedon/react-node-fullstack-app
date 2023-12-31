import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { HttpError } from './error';
import { sendHttpErrorModule } from './error/sendHttpError';
import { NextFunction } from "express";
import * as dotEnv from 'dotenv'
import * as  moment from 'moment'
import { log } from '../utils/loggingUtil'


dotEnv.config();

/**
 * @export
 * @param {express.Application} app
 */
export function configure(app: express.Application): void {

    // express middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // 5mb is added for file uploads
    app.use(bodyParser.json({ limit: '5mb' }));

    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());

    // returns the compression middleware
    app.use(compression());

    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());

    // providing a Connect/Express middleware that can be used to enable CORS with various options
    app.use(cors());

    // custom errors
    app.use(sendHttpErrorModule);

    // cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With,' +
            ' Content-Type, Accept,' +
            ' Authorization,' +
            ' Access-Control-Allow-Credentials'
        );
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use(logRequestPaths)
    // app.use(morgan('combined', { stream: winston.stream }));
    // app.use(logger(':method :url :status :res[content-length] :date[web] - :response-time ms'));
}

export function logRequestPaths(req: Express.Request, res: Express.Response, next: NextFunction): void {
    log.info(req)
    next();
}

export function logMiddleware(req: Express.Request, res: Express.Response, next: NextFunction): void {
    try{
        next()
    }catch(error) {
        next()
    }
}

interface CustomResponse extends express.Response {
    sendHttpError: (error: HttpError | Error, message?: string) => void;
}

/**
 * @export
 * @param {express.Application} app
 */
export function initErrorHandler(app: express.Application): void {
    app.use((error: Error, req: express.Request, res: CustomResponse, next: express.NextFunction) => {
        if (typeof error === 'number') {
            error = new HttpError(error); // next(404)
        }

        if (error instanceof HttpError) {
            res.sendHttpError(error);
        } else {
            if (app.get('env') === 'development') {
                error = new HttpError(500, error.message);
                res.sendHttpError(error);
            } else {
                error = new HttpError(400);
                res.sendHttpError(error, error.message);
            }
        }

        console.error(error);
    });
}


declare namespace Express {
    export interface Request {
        method: string;
        url: string;
    }

    export interface Response {
    }
}
