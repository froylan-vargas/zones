import CategoryActionTypes from './category.types'
import CatgoryActionTypes from './category.types'

const INITIAL_STATE = {
    categories: null,
    isFetching: false,
    errorMessage: undefined,
    selectedCategory: "0"
}

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categories: action.payload
            }
        case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case CatgoryActionTypes.SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer;

