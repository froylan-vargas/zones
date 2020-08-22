import ConfigActionTypes from './config.types';

const INITIAL_STATE = {
    configs: null,
    isFetching: false,
    errorMessage: {}
}

const configReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ConfigActionTypes.FETCH_CONFIG_SUCCESS:
            return {
                ...state,
                isFetching: false,
                configs: action.payload
            }
        case ConfigActionTypes.FETCH_CONFIG_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default configReducer;

