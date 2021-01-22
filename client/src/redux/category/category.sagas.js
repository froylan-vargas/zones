import { takeLatest, call, put, all } from 'redux-saga/effects';
import CategoryActionTypes from './category.types';
import axios from 'axios';

import { fetchCategoriesSuccess, fetchCategoriesFailure } from './category.actions';

function* fetchCategoriesAsync() {
    try {
        const categories = yield call(() => { return axios.get('/api/categories') });
        yield put(fetchCategoriesSuccess(categories.data));
    } catch (err) {
        yield put(fetchCategoriesFailure(err.response.data.errors));
    }
}

function* fetchCategoriesStart() {
    yield takeLatest(
        CategoryActionTypes.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

export function* categorySagas() {
    yield all([
        call(fetchCategoriesStart)
    ]);
}