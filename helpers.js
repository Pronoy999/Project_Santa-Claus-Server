const helpers = {};
/**
 * Method to parse the input to JSON.
 * @param data: The data to be parsed.
 * @returns {{}}: json.
 */
helpers.parseToJSON = function (data) {
    let obj = {};
    try {
        obj = JSON.parse(data);
    } catch (e) {
        return {};
    }
    return obj;
};
/**
 * Method to get a Random OTP.
 * @returns {number}
 */
helpers.createOTP = function () {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

/**
 * Exporting the helpers.
 */
module.exports = helpers;