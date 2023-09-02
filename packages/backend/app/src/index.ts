import * as http from 'http';
import * as https from 'https';
import * as eventHandlers from './services/eventHandlers';
import server from './services/server';
import * as loggingUtil from './utils/loggingUtil';
import * as app from "./app";
import * as  moment from 'moment'
import 'moment-timezone';


const timezone = "America/Sao_Paulo";

const env = process.env || {};

moment.tz.setDefault(timezone);

// const env = config["development"]

/**
 * Global variables
 */
declare global {
    module NodeJS {
      interface Global {
        appName: any;
        DEFAULT_PAGE_SIZE: number
      }
    }
  }
global.appName = 'Monorepo NodeJs App';
global.DEFAULT_PAGE_SIZE = 15;

// dbTools.dbExists().then(() => {

/**
 * API
 */
if (env.USE_HTTPS === 'true') {
    const options = {
    };
    const Server: https.Server = https.createServer(options, server);
    Server.listen(env.PORT);
    loggingUtil.logInfo('Server running at port ' + env.PORT);
    Server.on('error', (error: Error) => eventHandlers.onError(error, env.PORT));
    Server.on('listening', eventHandlers.onListening.bind(Server));

} else {
    const Server: http.Server = http.createServer(server);
    Server.listen(env.PORT);
    loggingUtil.logInfo('Server running at port ' + env.PORT);
    Server.on('error', (error: Error) => eventHandlers.onError(error, env.PORT));
    Server.on('listening', eventHandlers.onListening.bind(Server));

}

/**
 * Jobs
 */
app.app();