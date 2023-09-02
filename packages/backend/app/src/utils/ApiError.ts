/**
 * The `ApiError` class extends the built-in `Error` class to provide custom error handling for API operations.
 * It allows additional context, such as a `statusCode`, to be provided alongside the error message.
 */
export class ApiError extends Error {
    
    // Private property to store the HTTP status code associated with this error.
    private statusCode: number;

    /**
     * Constructs a new ApiError instance.
     * 
     * @param {string} name - The name of the error (e.g., 'NotFoundError', 'ValidationError').
     * @param {number} statusCode - The HTTP status code associated with this error (e.g., 404 for Not Found).
     * @param {string} [message] - Optional detailed error message.
     */
    constructor(name: string, statusCode: number, message?: string) {
        // Call the parent (Error) class's constructor with the message.
        super(message);
        
        // Set the error name (usually represents the type of the error).
        this.name = name;
        
        // Set the HTTP status code.
        this.statusCode = statusCode;
    }
}
