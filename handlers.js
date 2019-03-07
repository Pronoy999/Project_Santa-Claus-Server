const handlers = {};
const users = require('./Users');
const constants = require('./Constants');
/**
 * Default Handler.
 * @param dataObject
 * @returns {Promise<any>}
 */
handlers.notFound = function (dataObject) {
    return new Promise((resolve, reject) => {
        reject([400, {'res': constants.invalidPath}])
    });
};
/**
 * Method to handle the Users response.
 * @param dataObject
 * @returns {Promise<any>}
 */
handlers.users = function (dataObject) {
    return new Promise((resolve, reject) => {
        let promise;
        if (dataObject.method === 'post') {
            promise = users.add(dataObject);
        } else {
            reject([400, {'res': constants.invalidRequestMessage}]);
        }
        promise.then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
};

module.exports = handlers;