import { all, call } from 'redux-saga/effects'

import { categorySagas } from './category/category.sagas';
import { productSagas } from './product/product.sagas';
import { configSagas } from './config/config.sagas';

export default function* rootSaga() {
    yield all([
        call(categorySagas),
        call(productSagas),
        call(configSagas)
    ])
}