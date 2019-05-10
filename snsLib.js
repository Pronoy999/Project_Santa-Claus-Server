const aws = require('aws-sdk');
const sms = {};
aws.config.update({
   region: 'ap-southeast-1',
   accessKeyId: 'AKIAJZLKRHVB7IYQIFWA',
   secretAccessKey: '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'
});
const sns = new aws.SNS();
/**
 * Method to send an OTP.
 * @param phone: The Phone Number.
 */
sms.sendOTP = function (phone) {
   return new Promise((resolve, reject) => {
      const helpers = require('./helpers');
      const number = helpers.createOTP();
      const msg = 'Your OTP is: ' + number;
      const params = {
         Message: msg,
         MessageStructure: 'string',
         PhoneNumber: phone
      };
      /*sns.publish(params, function (err, data) {
         if (err) {
            reject(err);
         } else {
            resolve(number);
         }
      });*/
      resolve(number);
   });
};
/**
 * Method to send normal Text.
 * @param phoneNumber: The Phone Number where the data to Send.
 * @param msg: The Message.
 */
sms.sendMessage = function (phoneNumber, msg) {
   return new Promise((resolve, reject) => {
      const params = {
         Message: msg,
         MessageStructure: 'string',
         PhoneNumber: phoneNumber
      };
      sns.publish(params, function (err, data) {
         if (err) {
            console.log(err);
            reject(err);
         } else {
            resolve(false);
         }
      });
   });
};
module.exports = sms;
