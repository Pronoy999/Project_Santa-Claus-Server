const database = {};
const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'hx-db.cy5gosef4el7.ap-south-1.rds.amazonaws.com',
    user: 'db_admin',
    database: 'santa_claus',
    password: 'hxadmin123',
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