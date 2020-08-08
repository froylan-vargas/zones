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
    },
    validateCategory: (value) => {
        const errors = [];
        const number = parseInt(value);
        if (!inputValidators.greaterThanZero(number)) {
            errors.push('Se debe seleccionar una categoría');
        }
        return errors;
    },
    validateDescription: (value) => {
        const errors = [];
        if (!inputValidators.HasValue(value)) errors.push('Ingresa la descripción del producto');
        return errors;
    },
    validatePriority: (value) => {
        const errors = [];
        if (!inputValidators.isNumber(value)) {
            errors.push('La prioridad debe ser un número');
        }
        return errors;
    },
    validateFile: (file) => {
        const errors = [];
        if (!file.name) errors.push('Selecciona un archivo');
        return errors;
    }
}

export default productValidators;