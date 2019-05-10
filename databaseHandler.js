const database = {};
const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'HOST_NAME',
    user: 'USER_NAME',
    database: 'DB_NAME',
    password: 'DB_PASSWORD',
    port: 'PORT'
});
/**
 * Method to make the Query.
 * @param query: The query Statement to be executed.
 * @returns {Promise<any>}
 */
database.query = function (query) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err);
            } else {
                con.query(query, (err, results, fields) => {
                    con.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    });
};
/**
 * Exporting Database.
 */
module.exports = database;
