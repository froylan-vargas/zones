import ProductActionTypes from './product.types'

const INITIAL_STATE = {
    products: null,
    isFetching: false,
    showEditWindow: false,
    editOptions: undefined,
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
        case ProductActionTypes.SET_SHOW_EDIT_WINDOW:
            return {
                ...state,
                showEditWindow: action.payload
            }
        case ProductActionTypes.SET_EDIT_OPTIONS:
            return {
                ...state,
                editOptions: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;

