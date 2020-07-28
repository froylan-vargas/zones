import inputValidators from './validationMethods.utils'

const productValidators = {
    validateProductName: (value) => {
        const errors = [];
        if (!inputValidators.HasValue(value)) errors.push('Ingresa el nombre de producto');
        return errors;
    },
    validatePrice: (value) => {
        const errors = [];
        if (!inputValidators.greaterThanZero(value)) {
            errors.push('Precio debe de ser mayor a 0');
        } else if (!inputValidators.onlyTwoDecimals(value)) errors.push('Precio puede tener solo 2 decimales');
        return errors;
    }
}

export default productValidators;