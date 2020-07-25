const transformArrayToObject = (array, indexProperty) => {
    const transformedArray = array.reduce((accum, preTransformedElement) => {
        accum[preTransformedElement[indexProperty].toLowerCase()] = preTransformedElement
        return accum
    }, {})
    return transformedArray;
}

module.exports = {
    transformArrayToObject
}