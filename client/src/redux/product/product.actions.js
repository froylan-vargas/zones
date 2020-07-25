import ProductActionTypes from './product.types'

export const fetchProductsStart = categoryId => {
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

export const setShowEditWindow = showEditWindow => {
    console.log('action',showEditWindow);
    return {
        type: ProductActionTypes.SET_SHOW_EDIT_WINDOW,
        payload: showEditWindow
    }
}


export const setEditOptions = editOptions => ({
    type: ProductActionTypes.SET_EDIT_OPTIONS,
    payload: editOptions
})