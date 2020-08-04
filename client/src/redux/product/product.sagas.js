import { takeLatest, call, put, all } from 'redux-saga/effects'
import ProductActionTypes from './product.types'
import axios from 'axios'

import { fetchProductsSuccess, fetchProductsFailure } from './product.actions'

function* fetchProductsAsync() {
    try {
        const products = yield call(() => { return axios.get(`/api/product`) })
        yield put(fetchProductsSuccess(products.data.data))
    } catch (error) {
        yield put(fetchProductsFailure(error.message))
    }
}

function* fetchProductsStart() {
    yield takeLatest(
        ProductActionTypes.FETCH_PRODUCTS_START,
        fetchProductsAsync
    )
}

export function* productSagas() {
    yield all([
        call(fetchProductsStart)
    ])
}