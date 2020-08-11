import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import { setResultNotification } from '../../../redux/notification/notification.actions';
import { setSelectedCategory } from '../../../redux/category/category.actions';
import { setEditOptions } from '../../../redux/product/product.actions';
import notificationUtils from '../../../utils/notification.utils';
import productValidators from '../../../utils/validators/product-validators.utils';
import { downloadFile } from '../../../utils/excel-reader.utils';
import constants from '../../../utils/constants.utils';

import Button from '../../elements/button/button.component';
import CategoriesContainer from '../../categories-select-container/categories-select-container.component';

const DownloadProduct = ({ categoryId, setNotification, setCategory, setEditOptions }) => {

    const [fieldErrors, setFieldError] = useState({
        optionId: []
    })

    const validateDownload = () => {
        return !productValidators.validateCategory(categoryId).length
    }

    const download = async () => {
        const res = await axios.get(`/api/download/products/${categoryId}`);
        if (!res.data.error) {
            downloadFile(res.data);
        } else {
            setNotification(notificationUtils.createNotification(res, ''));
        }
        setCategory("0");
        setEditOptions({ setShowEditWindow: false });
    }

    const onFileDownload = () => {
        if (validateDownload()) download()
        else {
            setFieldError({
                ...fieldErrors,
                optionId: productValidators.validateCategory(categoryId),
            });
        }
    }

    return (
        <div className='product-download'>
            <div className="form-group">
                <CategoriesContainer fieldErrors={fieldErrors} setFieldError={setFieldError} label={constants.CATEGORY_LABEL} />
            </div>
            <div className='product-download__options'>
                <Button modifier='white' onClick={onFileDownload}>Descargar Productos</Button>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categoryId: selectSelectedCategory
});

const mapDispatchToProps = dispatch => ({
    setNotification: (notification) => dispatch(setResultNotification(notification)),
    setCategory: (categoryId) => dispatch(setSelectedCategory(categoryId)),
    setEditOptions: (editOptions) => dispatch(setEditOptions(editOptions))
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadProduct)