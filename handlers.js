const handlers = {};
const users = require('./Users');
const message = require('./messages');
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
            switch (dataObject.path) {
                case "login":
                    promise = users.login;
                    break;
            }
            reject([400, {'res': constants.invalidRequestMessage}]);
        }
        promise.then(response => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
};
/**
 * Handler to handle the messages request.
 * @param dataObject: The Request Object.
 * @returns {Promise<any>}
 */
handlers.msg = function (dataObject) {
    return new Promise((resolve, reject) => {
        let promise;
        switch (dataObject.path) {
            case "get":
                promise = message.get(dataObject);
                break;
            case "recent":
                promise = message.recent(dataObject);
                break;
            default:
                reject([400, {'res': constants.invalidPath}]);
        }
    });
};

module.exports = handlers;