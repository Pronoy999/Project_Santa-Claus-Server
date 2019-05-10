const messages = {};
messages.errorMessage = "Error.";
messages.headers = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT',
   'Access-Control-Max-Age': 2592000,
   'Access-Control-Allow-Headers': 'Content-Type'
};
messages.tokenExpiredMessage = "Invalid Token or Token Expired.";
messages.invalidRequestMessage = "Invalid Request Method.";
messages.alreadyLoggedIn = "The User is already logged in";
messages.errorMessage = "Error.";
messages.otpSend = "OTP Send.";
messages.newOtp = "New OTP Send.";
messages.noVideo = "Missing Video for the Order.";
messages.attendancePut = "Attendance successful.";
messages.invalidPassword = "Invalid Email or Password";
messages.invalidPath = "Invalid Path";
messages.companyPrefix = "HX";
messages.phoneInserted = "Inserted new Phone.";
messages.insufficientData = "Insufficient Data.";
messages.dateFormat = 'YYYY-MM-DD HH:mm:ss';
/**
 * Exporting messages.
 */
module.exports = messages;