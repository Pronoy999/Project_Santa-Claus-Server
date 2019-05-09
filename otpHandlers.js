const otpHandler = {};
const helpers = require('./helpers');
const constants = require('./Constants');
const sns = require('./snsLib');
const database = require('./databaseHandler');
/**
 * Method to handle the OTP request.
 * @param dataObject
 */
otpHandler.requestOtp = (dataObject) => {
   return new Promise((resolve, reject) => {
      let mobile = dataObject.postData.phoneNumber;
      if (!mobile.startsWith("+91")) {
         mobile = "+91" + mobile;
      }
      sns.sendOTP(mobile).then(otp => {
         const query = "INSERT INTO otp VALUES ('" + mobile + "'," + otp + ")";
         database.query(query).then(insertData => {
            resolve([200, {'res': constants.otpSend}]);
         }).catch(err => {
            const query = "UPDATE otp SET otp=" + otp + " WHERE phone = '" + mobile + "'";
            database.query(query).then(updateData => {
               resolve([200, {'res': constants.newOtp}]);
            }).catch(err => {
               reject([500, {'res': constants.errorMessage}]);
            });
         });
      }).catch(err => {
         reject([500, {'res': constants.errorMessage}]);
      });
   });
};
/**
 * Method to validate the OTP.
 * @param dataObject: The request Object.
 * @returns {Promise<any>}
 */
otpHandler.verifyOTP = (dataObject) => {
   return new Promise((resolve, reject) => {
      const mobile = dataObject.queryString.phoneNumber;
      const otp = dataObject.queryString.otp;
      const query = "SELECT * FROM otp WHERE otp=" + otp + " AND phone = '" + mobile + "'";
      database.query(query).then(selectData => {
         if (selectData[0].phone === mobile && selectData[0].otp === Number(otp)) {
            resolve([200, {'res': true}]);
         } else {
            resolve([500, {'res': false}]);
         }
      }).catch(err => {
         resolve([500, {'res': constants.errorMessage}]);
      });
   });
};

/**
 * Method to send the OTP.
 * @param mobile: The mobile number where the OTP to be sent.
 * @param otp: The OTP number to be sent.
 */
function sendOtp(mobile, otp) {
   if (!mobile.startsWith("+91")) {
      mobile = "+91" + mobile;
   }
   sns.sendMessage(mobile, otp).then(isSent => {
      console.log("OTP SEND");
   }).catch(err => {
      console.error(err);
   });
}

/**
 * Exporting the modules.
 */
module.exports = otpHandler;