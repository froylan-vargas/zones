export const inputValidators = {
    hasValue: (value:any) => !!value,
    isNumber: (value:any) => !isNaN(value),
    greaterThanZero: (value:any) => value > 0,
    onlyTwoDecimals: (value:any) => /^\d+(\.\d{0,2})?$/g.test(value)
}
