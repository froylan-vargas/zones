const notificationUtils = {
    createNotification: (resp, successMessage) => {
        let notification;
        if (resp.data.error)
            notification = {
                visible: true,
                isError: true,
                message: resp.data.error
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
