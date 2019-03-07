const handlers = {};
const constants = require('./Constants');
/**
 * Default Handler.
 * @param dataObject
 * @returns {Promise<any>}
 */
handlers.notFound = function (dataObject) {
    return new Promise((resolve, reject) => {
        reject(400, {'res': constants.errorMessage})
    });
};
handlers.users = function (dataObject) {
    return new Promise((resolve, reject) => {
        let promise;
       switch(dataObject.path){
           case "new":promise=
       }
    });
};

module.exports = handlers;