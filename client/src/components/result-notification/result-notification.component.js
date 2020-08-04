import React from 'react';
import { connect } from 'react-redux';

import { setResultNotification } from '../../redux/notification/notification.actions'

const ResultNotification = ({ message, isError, setNotification }) => {

    const onClose = () => {
        setNotification({
            visible: false,
            isError: false,
            message: ''
        })
    }

    return (
        <div className={`result-notification ${isError ? 'error' : ''}`}>
            {message}
            <span onClick={onClose} className='result-notification__close'>X</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNotification: notification => dispatch(setResultNotification(notification))
})

export default connect(null, mapDispatchToProps)(ResultNotification);