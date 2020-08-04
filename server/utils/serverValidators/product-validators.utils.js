const inputValidators = require('./validationMethods.utils')
const constants = require('../serverConstants.utils');

const validatePrice = (value) => {
    return inputValidators.isNumber(value)
        && inputValidators.greaterThanZero(value)
        && inputValidators.onlyTwoDecimals(value)
};

const validateCategory = (value) => {
    const number = parseInt(value);
    return inputValidators.isNumber(parseInt(number))
        && inputValidators.greaterThanZero(number)
};

const validateProduct = (product) => {
    const { categoryid, name, price, id } = product;
    const { hasValue } = inputValidators;
    if (!hasValue(id) || !hasValue(categoryid) || !hasValue(name) || !hasValue(price))
        return constants.MISSING_INFORMATION
    if (!validatePrice(price))
        return 'El precio es invalido';
    if (!validateCategory(categoryid))
        return 'La categoria es invalida';
    return null;
};


module.exports = validateProduct;