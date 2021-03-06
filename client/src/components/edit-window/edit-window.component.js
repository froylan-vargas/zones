import React from 'react';
import { connect } from 'react-redux';

import { setEditOptions } from '../../redux/product/product.actions';
import { setSelectedCategory } from '../../redux/category/category.actions';

const EditWindow = ({ children, setEditOptions, setSelectedCategory, purpose }) => {

    const onClose = () => {
        setEditOptions({ showEditWindow: false });
        setSelectedCategory("0");
    }

    return (
        <div className="edit-window">
            <div className="edit-window__content">
                <div className="edit-window__purpose">
                    {purpose}
                </div>
                <span onClick={onClose} className='edit-window__close'>X</span>
                {children}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setEditOptions: (editOptions) => dispatch(setEditOptions(editOptions)),
    setSelectedCategory: (selectedCategory) => dispatch(setSelectedCategory(selectedCategory))
})

export default connect(null, mapDispatchToProps)(EditWindow);