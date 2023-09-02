import { Dialect, Sequelize } from 'sequelize'
import {loggingUtil, safeParseInt } from "../utils";

const env = process.env || {};
require('pg').defaults.parseInt8 = true;

const sequelize = new Sequelize(
    env.DB_DATABASE,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        port: Number(   env.DB_PORT),
        host:   env.DB_HOST,
        dialect:    env.DB_DIALECT as Dialect,
        pool: {
            max: safeParseInt(env.DB_MAX_POOL, 5),  // default value = 5
            min: safeParseInt(env.DB_MIN_POOL, 1),  // Default value = 1
            idle: safeParseInt(env.DB_IDLE, 10000)  // Default value = 10000
                    },
        logging: function (str) {
            if ((   env.SEQ_LOGGING === 'true' )) {
                console.info(str);
            }
        },
    }
);

sequelize.sync({
    // Using 'force' will drop any table defined in the models and create them again.
    // force: true
    force: false
}).then(function () {
    loggingUtil.logInfo('DB connection success.');
}, function (err) {
    loggingUtil.logError(JSON.stringify(err));
});

export default sequelize