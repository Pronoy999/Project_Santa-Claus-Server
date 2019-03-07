const moment = require('moment');
const database = require('./databaseHandler');
const constants = require('./Constants');
const user = {};
/**
 * Method to add the new User.
 * @param dataObject: The Request Object.
 * @returns {Promise<any>}
 */
user.add = function (dataObject) {
    return new Promise((resolve, reject) => {
        if (dataObject.method === 'post') {
            const timeDate = Math.floor((new Date().getTime()) / 1000);
            const formattedDate = (moment.unix(timeDate).tz('Asia/Kolkata').format(constants.dateFormat)).split(' ');
            const time = formattedDate[1];
            const date = formattedDate[0];
            const firstName = typeof (dataObject.postData.first_name) === 'string' &&
            dataObject.postData.first_name.length > 0 ? dataObject.postData.first_name : false;
            const lastName = typeof (dataObject.postData.last_name) === 'string' &&
            dataObject.postData.last_name.length > 0 ? dataObject.postData.last_name : false;
            const email = typeof (dataObject.postData.email) === 'string' &&
            dataObject.postData.email.length > 0 ? dataObject.postData.email : false;
            let phone = typeof (dataObject.postData.phone) === 'string' &&
            dataObject.postData.phone.length > 0 ? dataObject.postData.phone : false;
            if (firstName && lastName && email && phone) {
                if (!phone.startsWith("+91")) {
                    phone = "+91" + phone;
                }
                const query = "INSERT INTO users_data " +
                    "VALUES ('" + firstName + "','" + lastName + "','" + email + "','" + phone + "','" + date + "','" + time + "')";
                database.query(query).then(results => {
                    resolve([200, {'res': true}]);
                }).catch(err => {
                    console.error(err.stack);
                    reject([500, {'res': constants.errorMessage}]);
                });
            } else {
                reject([400, {'res': constants.insufficientData}]);
            }
        } else {
            reject([400, {'res': constants.invalidRequestMessage}]);
        }
    });
};
/**
 * Exporting the users.
 */
module.exports = user;