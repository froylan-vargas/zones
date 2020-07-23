import ProductActionTypes from './product.types'

export const fetchProductsStart = categoryId => {
    console.log('action ' + categoryId)
    return {
        type: ProductActionTypes.FETCH_PRODUCTS_START,
        payload: categoryId
    }
} 

export const fetchProductsSuccess = products => ({
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products
})

export const fetchProductsFailure = errorMessage => ({
    type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
    payload: errorMessage
})