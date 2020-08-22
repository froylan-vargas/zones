export const transformArrayToObject = (array:any[], indexProperty:string) => {
    const transformedArray = array.reduce((accum:any, preTransformedElement:any) => {
        accum[preTransformedElement[indexProperty].toLowerCase()] = preTransformedElement
        return accum
    }, {})
    return transformedArray;
}