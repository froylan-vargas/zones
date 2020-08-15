import { inputValidators } from './validationMethods.utils';
import { constants } from '../serverConstants.utils';

export const validatePrice = (value: any) => {
    return inputValidators.isNumber(value)
        && inputValidators.greaterThanZero(value)
        && inputValidators.onlyTwoDecimals(value)
};

export const validateCategory = (value: any) => {
    const number = parseInt(value);
    return inputValidators.isNumber(number)
        && inputValidators.greaterThanZero(number);
};

export const validatePriority = (value: any) => {
    return inputValidators.isNumber(parseInt(value));
}

export const validateProduct = (product: any) => {
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

export const validateUploadProduct = (product: any) => {
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
