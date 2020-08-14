import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { readExcelFile } from '../../../utils/excel-reader.utils';
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

    const uploadFile = async () => {
        var reader = new FileReader();
        reader.onload = async function (e) {
            const excelData = readExcelFile(new Uint8Array(e.target.result));
            const fileResult = await axios.post(`/api/upload/products/${categoryid}`, { data: excelData });
            if (!fileResult.data.error) {
                fetchProductsStart();
            }
            setNotification(notificationUtils.createNotification(fileResult, 'Los productos se guardaron exitosamente.'));
            setCategory("0");
            setEditOptions({ setShowEditWindow: false });
        };
        reader.readAsArrayBuffer(file);
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
                    <UploadFile
                        accept={constants.EXCEL_TYPES}
                        value={file.name}
                        fieldErrors={fieldErrors}
                        setFile = {setFile}
                        setFieldError = {setFieldError}
                        label = {'Seleccione un archivo'}
                    />
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