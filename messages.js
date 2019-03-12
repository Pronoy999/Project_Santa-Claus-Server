const messages = {};
const constants = require('./Constants');
const database = require('./databaseHandler');
/**
 * Method to get the Messages between 2 users.
 * @param dataObject: the Request Object.
 * @returns {Promise<any>}
 */
messages.get = function (dataObject) {
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
                reject([500, {'res': constants.insufficientData}];
            }
        }
    });
};