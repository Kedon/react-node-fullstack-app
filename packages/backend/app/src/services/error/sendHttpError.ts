import { HttpError } from './index';
import { NextFunction, Request, Response } from 'express';

/**
 * Express middleware to send HTTP error response.
 * Adds a method `sendHttpError` to the `res` object to send formatted error responses.
 * 
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export function sendHttpErrorModule(req: Request, res: Response & { sendHttpError?: (error: HttpError) => void }, next: NextFunction): void {
    /**
     * Send an HTTP error in an appropriate format based on the request headers.
     * 
     * @param error - An instance of HttpError containing the error details.
     */
    res.sendHttpError = (error: HttpError): void => {
        res.status(error.status);

        // Check if the request is AJAX, has a JSON content type, or doesn't want HTML.
        if (
            req.xhr ||
            req.is('json') ||
            (req.is('json') && req.get('Accept')) ||
            !(req.get('Accept') && req.get('Accept').includes('html'))
        ) {
            res.json({
                status: error.status,
                name: error.name,
                message: error.message
            });
        } else {
            res.send(generateHTML(error));
        }
    };

    next();
}

/**
 * Generates an HTML response for a given error.
 * 
 * @param error - The error for which the HTML response needs to be generated.
 * @returns HTML string representation of the error or an empty string.
 */
const generateHTML = (error: HttpError): string => {
    if (error) {
        return `
            <div style='text-align: center;'>
                <p>Status: ${error.status}</p>
                <p>Name: ${error.name}</p>
                <p>${error}</p>
            </div>`;
    }

    return '';
};
