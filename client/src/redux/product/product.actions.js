import ProductActionTypes from './product.types'

export const fetchProductsStart = () => {
    return {
        type: ProductActionTypes.FETCH_PRODUCTS_START
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

export const setEditOptions = editOptions => ({
    type: ProductActionTypes.SET_EDIT_OPTIONS,
    payload: editOptions
})