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

    const renderNotification = () => {
        if (message.length) {
            return <ul>
                {
                    message.map((result, i) => {
                        return (
                            <li
                                className="result-notification__element"
                                key={`line-${i}`}><span>{result.message}</span>
                            </li>)
                    })
                }
            </ul>
        } else {
            return <span>{message}</span>
        }
    }

    return (
        <div className={`result-notification ${isError ? 'error' : ''}`}>
            {
                renderNotification()
            }
            <span onClick={onClose} className='result-notification__close'>X</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNotification: notification => dispatch(setResultNotification(notification))
})

export default connect(null, mapDispatchToProps)(ResultNotification);