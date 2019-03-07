const database = {};
const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'YOUR_HOST_NAME',
    user: 'USER_NAME',
    database: 'DATABASE_NAME',
    password: 'DATABASE_PASSWORD',
    port: '3306'
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