import NotificationActionTypes from './notification.types'

export const setResultNotification = (notification) => {
    return {
        type: NotificationActionTypes.SET_RESULT_NOTIFICATION,
        payload: notification
    }
}