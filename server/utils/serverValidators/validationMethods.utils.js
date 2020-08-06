const inputValidators = {
    hasValue: (value) => !!value,
    isNumber: (value) => !isNaN(value),
    greaterThanZero: (value) => value > 0,
    onlyTwoDecimals: (value) => /^\d+(\.\d{0,2})?$/g.test(value)
}

module.exports = inputValidators;
