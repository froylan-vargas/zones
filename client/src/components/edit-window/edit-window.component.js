import React from 'react'
import { connect } from 'react-redux'

import { setShowEditWindow } from '../../redux/product/product.actions'

const onClose = (setShowEditWindow) => {
    setShowEditWindow(false);
}

const EditWindow = ({ children, setShowEditWindow }) => {
    return (
        <div className="edit-window">
            <span onClick={() => { onClose(setShowEditWindow) }} className='edit-window__close'>X</span>
            {children}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setShowEditWindow: (showEditWindow) => dispatch(setShowEditWindow(showEditWindow))
})

export default connect(null, mapDispatchToProps)(EditWindow);