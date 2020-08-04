import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import productValidators from '../../../utils/validators/product-validators.utils';
import { fetchProductsStart } from '../../../redux/product/product.actions';
import { setResultNotification } from '../../../redux/notification/notification.actions';
import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import notificationUtils from '../../../utils/notification.utils';

import CategoriesContainer from '../../categories-select-container/categories-select-container.component';
import FormError from '../../elements/form-error/form-error.component'

const ProductUpload = ({ fetchProductsStart, setNotification, categoryid }) => {

    const [file, setFile] = useState(undefined);
    const [fieldErrors, setFieldError] = useState({
        file: [],
        categoryid: []
    })

    const validateUpload = () => {
        return !productValidators.validateCategory(categoryid).length
            && file
    }

    const onSelectFile = event => {
        setFile(event.target.files[0]);
    }

    const uploadFile = async () => {
        const data = new FormData();
        data.append('file', file)
        const fileResult = await axios.post(`/api/upload/products/${categoryid}`, data);
        setNotification(notificationUtils.createNotification(fileResult, 'Los productos se guardaron exitosamente.'));
        fetchProductsStart();
    }

    const onFileUpload = async () => {
        if (validateUpload()) uploadFile()
        else {
            setFieldError({
                ...fieldErrors,
                categoryid: productValidators.validateCategory(categoryid),
                file: productValidators.validateFile(file)
            });
        }
    }

    return (
        <div className='product-upload'>
            <form method="post" action="#">
                <div className="form-group">
                    <CategoriesContainer errors={fieldErrors['categoryid']} />
                    <label>Upload Your File</label>
                    <input type="file" className="form-control" onChange={onSelectFile} />
                    <FormError errors={fieldErrors['file']} />
                </div>
                <button type="button" onClick={() => { onFileUpload() }}>Upload Products</button>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categoryid: selectSelectedCategory
});

const mapDispatchToProps = dispatch => ({
    fetchProductsStart: () => dispatch(fetchProductsStart()),
    setNotification: (notification) => dispatch(setResultNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpload);