require('dotenv').config();
const logger = require('./logger');
const Pool = require('pg-pool');
const url = require('url')

const params = url.parse(`${process.env.DATABASE_URL}`);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: false
};

const pool = new Pool(config);

// logger.info(`DB Connection Settings: ${JSON.stringify(pgconfig)}`);

pool.on('error', function (err, client) {
    logger.error(`idle client error, ${err.message} | ${err.stack}`);
});




module.exports.sqlToDB = async (sql, data) => {
    logger.debug(`sqlToDB() sql: ${sql} | data: ${data}`);
    try {
        let result = await pool.query(sql, data);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports.getTransaction = async () => {
    logger.debug(`getTransaction()`);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        return client;
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports.sqlExecSingleRow = async (client, sql, data) => {
    logger.debug(`sqlExecSingleRow() sql: ${sql} | data: ${data}`);
    try {
        let result = await client.query(sql, data);
        logger.debug(`sqlExecSingleRow(): ${result.command} | ${result.rowCount}`);
        return result
    } catch (error) {
        logger.error(`sqlExecSingleRow() error: ${error.message} | sql: ${sql} | data: ${data}`);
        throw new Error(error.message);
    }
}



module.exports.sqlExecMultipleRows = async (client, sql, data) => {
    logger.debug(`inside sqlExecMultipleRows()`);
    let result = [];
    if (data.length !== 0) {
        for(let item of data) {
            try {
                logger.debug(`sqlExecMultipleRows() item: ${item}`);
                logger.debug(`sqlExecMultipleRows() sql: ${sql}`);
                let res = await client.query(sql, item);
                result.push(res.rows[0]);
            } catch (error) {
                logger.error(`sqlExecMultipleRows() error: ${error}`);
                throw new Error(error.message);
            }
        }
    } else {
        logger.error(`sqlExecMultipleRows(): No data available`);
        throw new Error('sqlExecMultipleRows(): No data available');
    }
    return result;
}

/*
 * Rollback transaction
 */
module.exports.rollback = async (client) => {
    if (typeof client !== 'undefined' && client) {
        try {
            logger.info(`sql transaction rollback`);
            await client.query('ROLLBACK');
        } catch (error) {
            throw new Error(error.message);
        } finally {
            client.release();
        }
    } else {
        logger.warn(`rollback() not excuted. client is not set`);
    }
}

/*
 * Commit transaction
 */
module.exports.commit = async (client) => {
    try {
        await client.query('COMMIT');
    } catch (error) {
        throw new Error(error.message);
    } finally {
        client.release();
    }
}