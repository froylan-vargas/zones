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

    const renderMessage = (result) => {
        if (Array.isArray(result)) {
            return <ul>
                {
                    result.map((line, i) => {
                        return <li className="result-notification__element" key={`line-${i}`}><span>{line}</span></li>
                    })
                }
            </ul>
        } else {
            return <span>{result}</span>
        }
    }

    return (
        <div className={`result-notification ${isError ? 'error' : ''}`}>
            {
                renderMessage(message)
            }
            <span onClick={onClose} className='result-notification__close'>X</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNotification: notification => dispatch(setResultNotification(notification))
})

export default connect(null, mapDispatchToProps)(ResultNotification);