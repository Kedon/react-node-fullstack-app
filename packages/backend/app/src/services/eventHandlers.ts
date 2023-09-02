import * as debug from 'debug';
import { Address } from 'cluster';

/**
 * Handle specific listen errors with friendly messages.
 * @param error - The error information provided by NodeJS.
 * @param port - The port number/string/boolean on which the error occurred.
 */
export function onError(error: NodeJS.ErrnoException, port: number | string | boolean): void {
    // Check if the system call isn't a 'listen'
    if (error.syscall !== 'listen') {
        throw error;
    }

    // Determine if the port is a named pipe or a port number
    const bind: string = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Log to the console once the server starts listening.
 */
export function onListening(): void {
    const addr: Address = this.address();
    const bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;

    debug(`Listening on ${bind}`);
}
