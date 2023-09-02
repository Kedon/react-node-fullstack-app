// Import JWT authentication services to handle JWT-related tasks.
import * as jwtAuth from "../services/jwtAuth";

// Import the type definition for account attributes from the database attributes module.
import { AccountAttributes } from "../database/attributes";

// Import the express Request type definition to handle incoming HTTP requests.
import {Request} from "express";

// Import Node's built-in crypto module for cryptographic functionalities.
import * as crypto from 'crypto';

/**
 * Retrieves user details from the JWT payload.
 * 
 * @param {Request} req - The express request object.
 * @returns {Promise<any>} Returns a promise that resolves to the user's account attributes or an error.
 */
export async function getJwtPayloadUserDetails(req: Request): Promise<any> {
    try {
        // Extract the JWT payload from the request.
        const payload = jwtAuth.getJwtPayload(req);

        // If the payload doesn't exist, throw an error indicating the missing user ID.
        if(!payload) {
            throw new Error('Falta o ID do usuário');
        }

        // Construct and type the payload user details from the JWT payload.
        const payloadUser: Pick<AccountAttributes, 'account_uuid' | 'account_id'> = {
            account_uuid: payload.account_uuid,
            account_id: payload.account_id,
        };

        // If the account_id is missing in the payload, throw an error.
        if (payloadUser.account_id === undefined) {
            throw new Error('Falta o ID do usuário');
        }

        // Return the constructed payload.
        return payload;
    } catch(error) {
        // Return any errors that occurred during the extraction process.
        return error;
    }
}

/**
 * Generates a new salt value for password hashing.
 * 
 * @returns {Promise<string>} Returns a promise that resolves to a random 16-byte salt value in hex format.
 */
export async function GetSalt(): Promise<string> {
    return crypto.randomBytes(16).toString('hex');
}

// Alternative export syntax for the GetSalt function.
exports.GetSalt = GetSalt;
