import {createSelector} from 'reselect'

const selectCategory = state => state.category

export const selectCategories = createSelector(
    [selectCategory],
    category => category.categories
)

export const selectIsFetchingCategories = createSelector(
    [selectCategory],
    category => category.isFetching
)
