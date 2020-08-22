import ConfigActionTypes from './config.types'

export const fetchConfigStart = () => {
    return {
        type: ConfigActionTypes.FETCH_CONFIG_START
    }
}

export const fetchConfigSuccess = configs => {
 console.log('actions',configs);
    return {
    type: ConfigActionTypes.FETCH_CONFIG_SUCCESS,
    payload: configs
 }
} 


export const fetchConfigFailure = errorMessage => ({
    type: ConfigActionTypes.FETCH_CONFIG_FAILURE,
    payload: errorMessage
})