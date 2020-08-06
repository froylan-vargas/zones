import NotificationActionTypes from './notification.types';

const INITIAL_STATE = {
    notification : undefined
}

const notificationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case NotificationActionTypes.SET_RESULT_NOTIFICATION:
            return {
                ...state,
                notification : action.payload
            }
        default:
            return state;
    }
}

export default notificationReducer;