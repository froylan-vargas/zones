import { takeLatest, call, put, all } from 'redux-saga/effects';
import ConfigActionTypes from './config.types';
import axios from 'axios';

import {fetchConfigSuccess, fetchConfigFailure} from '../config/config.actions';

function* fetchConfigsAsync() {
    try {
        const configs = yield call(() => { return axios.get(`/api/config`) })
        yield put(fetchConfigSuccess(configs.data))
    } catch (error) {
        yield put(fetchConfigFailure(error.message))
    }
}

function* fetchConfigsStart() {
    yield takeLatest(
        ConfigActionTypes.FETCH_CONFIG_START,
        fetchConfigsAsync
    )
}

export function* configSagas() {
    yield all([
        call(fetchConfigsStart)
    ])
}