import CategoryActionTypes from './category.types'

export const fetchCategoriesStart = () => ({
    type: CategoryActionTypes.FETCH_CATEGORIES_START
})

export const fetchCategoriesSuccess = categories => ({
    type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories
})

export const fetchCategoriesFailure = errorMessage => ({
    type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
    payload: errorMessage
})