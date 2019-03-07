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
 * Exporting the helpers.
 */
module.exports = helpers;