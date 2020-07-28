const inputValidators = {
    HasValue: (value) => !!value,
    greaterThanZero: (value) => value > 0,
    onlyTwoDecimals: (value) => /^\d+(\.\d{0,2})?$/g.test(value)
}

export default inputValidators;
