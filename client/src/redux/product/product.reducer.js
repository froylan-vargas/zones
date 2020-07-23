import ProductActionTypes from './product.types'

const INITIAL_STATE = {
    products: null,
    isFetching: false,
    errorMessage: undefined
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetching: true
            }
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: action.payload
            }
        case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;

