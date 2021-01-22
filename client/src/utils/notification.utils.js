const notificationUtils = {
    createNotification: (errors, successMessage) => {
        let notification;
        if (errors.length)
            notification = {
                visible: true,
                isError: true,
                message: errors
            }
        else
            notification = {
                visible: true,
                isError: false,
                message: successMessage
            }
        return notification;
    }
}

export default notificationUtils;
