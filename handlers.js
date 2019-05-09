const handlers = {};
const users = require('./Users');
const constants = require('./Constants');
const msg = require('./messagesHandler');
const otpHandler = require('./otpHandlers');
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
 * Handlers to handle the OTP requests.
 * @param dataObject: The request object.
 * @returns {Promise<any>}
 */
handlers.otp = (dataObject) => {
   return new Promise((resolve, reject) => {
      let promise;
      if (dataObject.method === 'post') {
         promise = otpHandler.requestOtp(dataObject);
      } else if (dataObject.method === 'get') {
         promise = otpHandler.verifyOTP(dataObject);
      } else {
         reject([400, {'res': constants.invalidPath}]);
      }
      promise.then(response => {
         resolve(response);
      }).catch(err => {
         reject(err);
      });
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
            promise = msg.get(dataObject);
            break;
         case "recent":
            promise = msg.recent(dataObject);
            break;
         default: {
            if (dataObject.method === 'post') {
               promise = msg.new(dataObject);
            }
         }
      }
      promise.then(response => {
         resolve(response);
      }).catch(err => {
         reject(err);
      })
   });
};

module.exports = handlers;