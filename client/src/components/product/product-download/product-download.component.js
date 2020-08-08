import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import download from 'downloadjs';

import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import { setResultNotification } from '../../../redux/notification/notification.actions';
import { setSelectedCategory } from '../../../redux/category/category.actions';
import { setEditOptions } from '../../../redux/product/product.actions';
import notificationUtils from '../../../utils/notification.utils';
import productValidators from '../../../utils/validators/product-validators.utils';

import Button from '../../elements/button/button.component';
import CategoriesContainer from '../../categories-select-container/categories-select-container.component';
import constants from '../../../utils/constants.utils';

const DownloadProduct = ({ categoryId, setNotification, setCategory, setEditOptions }) => {

    const [fieldErrors, setFieldError] = useState({
        optionId: []
    })

    const validateDownload = () => {
        return !productValidators.validateCategory(categoryId).length
    }

    const downloadFile = async () => {
        const res = await axios.get(`/api/download/products/${categoryId}`, { responseType: 'blob' });
        let resBlob = res.data;
        let resData = null;

        try {
            let resText = await new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.addEventListener('abort', reject)
                reader.addEventListener('error', reject)
                reader.addEventListener('loadend', () => {
                    resolve(reader.result)
                })
                reader.readAsText(resBlob)
            })
            resData = JSON.parse(resText)
        } catch (err) { }

        if (resData) {
            console.log('resData', resData)
            if (resData.data.error) {
                setNotification(notificationUtils.createNotification(resData, ''));
                setEditOptions({ setShowEditWindow: false });
            }
        }
        else {
            const blob = new Blob([res.data]);
            setCategory(categoryId);
            setEditOptions({ setShowEditWindow: false });
            download(blob, 'Lista_Productos.xlsx');
        }
    }

    const onFileDownload = () => {
        if (validateDownload()) downloadFile()
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