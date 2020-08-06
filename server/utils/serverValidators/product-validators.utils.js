const inputValidators = require('./validationMethods.utils')
const constants = require('../serverConstants.utils');

const validatePrice = (value) => {
    return inputValidators.isNumber(value)
        && inputValidators.greaterThanZero(value)
        && inputValidators.onlyTwoDecimals(value)
};

const validateCategory = (value) => {
    const number = parseInt(value);
    return inputValidators.isNumber(number)
        && inputValidators.greaterThanZero(number);
};

const validatePriority = (value) => {
    return inputValidators.isNumber(parseInt(value));
}

const validateProduct = (product) => {
    const errors = [];
    const { categoryid, name, price, id, description, priority } = product;
    const { hasValue } = inputValidators;
    if (!hasValue(id) || !hasValue(categoryid) || !hasValue(name) || !hasValue(description) || !hasValue(price))
        return [constants.MISSING_INFORMATION];
    if (!validatePrice(price))
        errors.push('El precio es invalido.');
    if (!validateCategory(categoryid))
        errors.push('La categoria es invalida.');
    if (!validatePriority(priority))
        errors.push('La prioridad debe de ser un número.');
    return errors;
};

const validateUploadProduct = (product) => {
    const errors = [];
    const { name, price, description } = product;
    const { hasValue } = inputValidators;
    if (!hasValue(name))
        errors.push([constants.MISSING_INFORMATION]);
    if (!hasValue(description))
        errors.push('la descripción es requerida')
    if (!hasValue(price))
        errors.push('el precio es requerido');
    if (price && !validatePrice(price))
        errors.push('el precio es invalido');
    return errors;
}


module.exports = {
    validateProduct,
    validateCategory,
    validateUploadProduct
} 
