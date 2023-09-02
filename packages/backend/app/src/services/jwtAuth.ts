// Importing required libraries and types
import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import HttpError from './error/index';
import * as http from 'http';

// Setting up environment variable
const env = process.env || {};

// Extending Request interface to include user property
export interface RequestWithUser extends Request {
    user: object | string;
}

/**
 * Middleware to check if the incoming request is authenticated.
 * Extracts JWT token from the request header and verifies it.
 * 
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * 
 * @swagger
 *  components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       name: authorization
 */
export function isAuthenticated(req: any, res: Response, next: NextFunction): void {
    try {
        // Extract JWT token from authorization header
        const jwtToken: string = req.headers['authorization']?.replace(/^Bearer\s/, '');

        if (jwtToken) {
            try {
                // Verify JWT token and set user property on request
                req.user = jwt.verify(jwtToken, env.JWT_SECRET);
                return next();
            } catch (error) {
                // Token verification failed
                return next(new HttpError(401, http.STATUS_CODES[401]));
            }
        }
        // If no JWT token, respond with an error message
        res.json({
            status: 400,
            message: 'No token provided'
        });
        return next();
    } catch (e) {
        if (e.code === 500) {
            return next(new HttpError(e.message.status, e.message));
        }
        res.json({
            status: 400,
            message: 'No token provided'
        });
        return next();
    }
}

// Interface defining the expected shape of JWT payload
export interface JwtPayloadInterface {
    account_id: number;
    account_uuid: string;
    email: string;
    service_id?: string;
    is_active: boolean;
    iat: number;
    exp: number;
}

/**
 * Extracts JWT token from the request header
 * 
 * @param {Request} req
 * @returns {string} - JWT token
 */
export function getToken(req: Request): string | undefined {
    return req.headers['authorization']?.replace(/^Bearer\s/, '');
}

/**
 * Decodes JWT token and returns its payload
 * 
 * @param {Request} req
 * @returns {JwtPayloadInterface} - Decoded JWT payload
 */
export function getJwtPayload(req: Request): JwtPayloadInterface | null {
    return jwt.decode(getToken(req)) as JwtPayloadInterface;
}
