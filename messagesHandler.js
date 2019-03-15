const messagesHandler = {};
const moment = require('moment');
const tz = require('moment-timezone');
const constants = require('./Constants');
const database = require('./databaseHandler');
const sns = require('./snsLib');
/**
 * Method to get the Messages between 2 users.
 * @param dataObject: the Request Object.
 * @returns {Promise<any>}
 */
messagesHandler.get = function (dataObject) {
    return new Promise((resolve, reject) => {
        if (dataObject.method === 'post') {
            const senderID = typeof (dataObject.postData.sender_email) === 'string' &&
            dataObject.postData.sender_email.length > 0 ? dataObject.postData.sender_email : false;
            const receiverId = typeof (dataObject.postData.receiver_email) === 'string' &&
            dataObject.postData.receiver_email.length > 0 ? dataObject.postData.receiver_email : false;
            if (receiverId && senderID) {
                const query = "SELECT * FROM message_data WHERE" +
                    " ((sender_email LIKE '" + senderID + "' AND receiver_email LIKE '" + receiverId + "')" +
                    " OR (receiver_email LIKE '" + senderID + "' AND sender_email LIKE '" + receiverId + "'))";
                database.query(query).then(msgData => {
                    resolve([200, {'res': msgData}]);
                }).catch(err => {
                    reject([500, {'res': constants.errorMessage}]);
                });
            } else {
                reject([500, {'res': constants.insufficientData}]);
            }
        }
    });
};
/**
 * Method to fetch the Recent messagesHandler for a user.
 * @param dataObject: The Request Object.
 * @returns {Promise<any>}
 */
messagesHandler.recent = function (dataObject) {
    return new Promise((resolve, reject) => {
        if (dataObject.method === 'post') {
            const email = typeof (dataObject.postData.email) === 'string' && dataObject.postData.email.length > 0 ? dataObject.postData.email : false;
            const query = "SELECT * FROM message_data WHERE id IN " +
                "(SELECT max(id) as id FROM" +
                " (SELECT id,receiver_email as email FROM message_data WHERE " +
                "sender_email = '" + email + "' UNION SELECT id, sender_email as " +
                "email FROM message_data WHERE receiver_email LIKE '" + email + "') as T " +
                "GROUP BY email);";
            database.query(query).then(msgData => {
                resolve([200, {'res': msgData}]);
            }).catch(err => {
                console.error(err.stack);
                reject([500, {'res': constants.errorMessage}]);
            });
        } else {
            reject([400, {'res': constants.invalidRequestMessage}]);
        }
    });
};
/**
 * Method to insert new Messages.
 * @param dataObject: The Request Object.
 * @returns {Promise<any>}
 */
messagesHandler.new = function (dataObject) {
    return new Promise((resolve, reject) => {
        const senderEmail = typeof (dataObject.postData.sender_email) === 'string' &&
        dataObject.postData.sender_email.length > 0 ? dataObject.postData.sender_email : false;
        const receiverEmail = typeof (dataObject.postData.receiver_email) === 'string' &&
        dataObject.postData.receiver_email.length > 0 ? dataObject.postData.receiver_email : false;
        const msg = typeof (dataObject.postData.message) === 'string' ? dataObject.postData.message : false;
        const url = typeof (dataObject.postData.url) === 'string' &&
        dataObject.postData.url.length > 0 ? dataObject.postData.url : false;
        const formattedTime = moment.unix((Math.floor(new Date().getTime() / 1000)))
            .tz('Asia/Kolkata').format(constants.dateFormat).split(' ');
        if (senderEmail && receiverEmail && url) {
            const query = "INSERT INTO message_data VALUES ('','" + messagesHandler + "','"
                + url + "','" + senderEmail + "','" + receiverEmail + "','" +
                formattedTime[1] + "','" + formattedTime[0] + "')";
            database.query(query).then(insertData => {
                resolve([200, {'res': true}]);
                sendMessageToUser(receiverEmail, "You have a new message pending.");
                //TODO: Send Notification to receiver.
            }).catch(err => {
                reject([500, {'res': constants.errorMessage}]);
            });
        } else {
            reject([400, {'res': constants.insufficientData}]);
        }
    });
};

/**
 * Method to send text to receiver.
 * @param email: The Receiver email.
 * @param msg: The Message that is to be send.
 */
function sendMessageToUser(email, msg) {
    const query = "SELECT * FROM user_data WHERE email LIKE '" + email + "'";
    database.query(query).then(userData => {
        const phone = userData[0].phone;
        sns.sendMessage(phone, msg).then(() => {
            console.log("User notified.");
        }).catch(err => {
            console.log("Couldn't send Sms.");
        });
    }).catch(err => {

    });
}

/**
 * Exporting Messages.
 */
module.exports = messagesHandler;