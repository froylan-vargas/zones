import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import productValidators from '../../../utils/validators/product-validators.utils';
import { fetchProductsStart, setEditOptions } from '../../../redux/product/product.actions';
import { setResultNotification } from '../../../redux/notification/notification.actions';
import { setSelectedCategory } from '../../../redux/category/category.actions';
import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import notificationUtils from '../../../utils/notification.utils';
import constants from '../../../utils/constants.utils';

import CategoriesContainer from '../../categories-select-container/categories-select-container.component';
import Button from '../../elements/button/button.component';
import UploadFile from '../../elements/upload-file/upload-file.component';

const ProductUpload = ({ fetchProductsStart, setNotification, categoryid, setCategory, setEditOptions }) => {

    const [file, setFile] = useState({});
    const [fieldErrors, setFieldError] = useState({
        file: [],
        optionId: []
    });

    const validateUpload = () => {
        return !productValidators.validateCategory(categoryid).length
            && file.name
    }

    const onSelectFile = event => {
        if (event.target.files[0]) {
            setFieldError({
                ...fieldErrors,
                file: []
            });
        }
        setFile(event.target.files[0]);
    }

    const uploadFile = async () => {
        const data = new FormData();
        console.log(file);
        data.append('file', file)
        const fileResult = await axios.post(`/api/upload/products/${categoryid}`, data);
        if (!fileResult.data.error) {
            fetchProductsStart();
        }
        setNotification(notificationUtils.createNotification(fileResult, 'Los productos se guardaron exitosamente.'));
        setCategory(0);
        setEditOptions({ setShowEditWindow: false });
    }

    const onFileUpload = async (event) => {
        event.preventDefault();
        if (validateUpload()) uploadFile()
        else {
            setFieldError({
                ...fieldErrors,
                optionId: productValidators.validateCategory(categoryid),
                file: productValidators.validateFile(file)
            });
        }
    }

    return (
        <div className='product-upload'>
            <form method="post">
                <div className="form-group">
                    <CategoriesContainer fieldErrors={fieldErrors} setFieldError={setFieldError} label={constants.CATEGORY_LABEL} />
                    <UploadFile accept={constants.EXCEL_TYPES} value={file.name} fieldErrors={fieldErrors} onSelectFile={onSelectFile} />
                </div>
                <div className="product-upload__options">
                    <Button modifier='white' onClick={onFileUpload}>Subir productos</Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    categoryid: selectSelectedCategory
});

const mapDispatchToProps = dispatch => ({
    fetchProductsStart: () => dispatch(fetchProductsStart()),
    setNotification: (notification) => dispatch(setResultNotification(notification)),
    setCategory: (categoryId) => dispatch(setSelectedCategory(categoryId)),
    setEditOptions: (editOptions) => dispatch(setEditOptions(editOptions))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpload);