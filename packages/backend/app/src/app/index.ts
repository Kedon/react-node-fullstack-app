// External imports
import { scheduleJob } from 'node-schedule';

// Local imports
import { exampleTask } from '../utils/exampleTask';

/**
 * Initializes scheduled tasks for the application.
 */
export function app(): void {
    // Schedule an 'exampleTask' to run every 6 hours.
    // Cron pattern: Minute Hour Day Month Day-of-week
    scheduleJob('0 */6 * * *', async function () {
        await exampleTask();
    });

    // Add more scheduled tasks here if needed.
}
