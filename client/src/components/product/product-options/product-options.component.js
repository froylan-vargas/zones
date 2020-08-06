import React from 'react';
import { connect } from 'react-redux';

import { setEditOptions } from '../../../redux/product/product.actions';
import { setSelectedCategory } from '../../../redux/category/category.actions';
import constants from '../../../utils/constants.utils';

import Button from '../../elements/button/button.component'

const ProductOptions = ({ setEditOptions, setCategory }) => {

    const product = {
        id: '0',
        isactive: true,
        name: '',
        description: '',
        priority: 0,
        price: undefined
    }

    const createEditOptions = (type) => {
        switch (type) {
            case constants.CREATE_PRODUCT:
                return {
                    type,
                    product,
                    method: 'create',
                    showEditWindow: true
                }
            case constants.UPLOAD_PRODUCT:
                return {
                    type,
                    showEditWindow: true
                }
            case constants.DOWNLOAD_PRODUCT:
                return {
                    type,
                    showEditWindow: true
                }
            case constants.IMAGES_UPLOAD:
                return {}
            default:
                return {}
        }
    }

    const buttonClick = (type) => {
        setEditOptions(createEditOptions(type));
        setCategory("0");
    }

    return (
        <div className='product-options'>
            <Button modifier={'white'} onClick={() => buttonClick(constants.UPLOAD_PRODUCT)}>Upload products</Button>
            <Button modifier={'white'} onClick={() => buttonClick(constants.DOWNLOAD_PRODUCT)}>Download</Button>
            <Button modifier={'white'} onClick={() => buttonClick(constants.IMAGES_UPLOAD)}>Upload Images</Button>
            <Button modifier={'white'} onClick={() => buttonClick(constants.CREATE_PRODUCT)}>Add Product</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setEditOptions: (editOptions) => dispatch(setEditOptions(editOptions)),
    setCategory: (selectedCategory) => dispatch(setSelectedCategory(selectedCategory))
})

export default connect(null, mapDispatchToProps)(ProductOptions)