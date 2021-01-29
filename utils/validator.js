const Validator = require('fastest-validator');
/**
 * Validate
 * @param {*} fields
 * @param {*} schema
 * @returns {Array} issues
 */
const _validate = (fields, schema) => {
    const validator = new Validator();
    const results = validator.validate(fields, schema);
    return results;
};

/**
 * Validate for room settings
 * @param {*} item 
 */
const validateRoomSetting = (item) => {
    const schema = {
        mode: { type: "enum", values: ["time", "host"] },
        rounds: { type: "number", positive: true, integer: true },
        balance: { type: "number", positive: true, integer: true }
    }

    if (item.mode === "time") {
        schema['time'] = { type: "number", positive: true, integer: true };
    }
    return _validate(item, schema);
}

module.exports = {
    validateRoomSetting
}