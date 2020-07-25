import {createSelector} from 'reselect'

const selectProduct = state => state.product

export const selectProducts = createSelector(
    [selectProduct],
    product => product.products
)

export const selectIsFetchingProducts = createSelector(
    [selectProduct],
    product => product.isFetching
)

export const selectShowEditWindow = createSelector(
    [selectProduct],
    product => product.showEditWindow
)

export const selectEditOptions = createSelector(
    [selectProduct],
    product => product.editOptions
)
