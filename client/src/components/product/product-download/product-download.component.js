import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import productValidators from '../../../utils/validators/product-validators.utils';
import { downloadFile } from '../../../utils/excel-reader.utils';
import constants from '../../../utils/constants.utils';

import Button from '../../elements/button/button.component';
import CategoriesContainer from '../../categories-select-container/categories-select-container.component';
import AdminUseRequest from '../../admin/admin-use-request.component';

const DownloadProduct = ({ categoryId }) => {

    const {doRequest} = AdminUseRequest({
        url: `/api/download/products/${categoryId}`,
        method: 'get',
        body: {},
        onSuccess: result => downloadFile(result)
    });

    const downloadRequest = doRequest;

    const [fieldErrors, setFieldError] = useState({
        optionId: []
    })

    const validateDownload = () => {
        return !productValidators.validateCategory(categoryId).length
    }

    const onFileDownload = () => {
        if (validateDownload()) downloadRequest();
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

export default connect(mapStateToProps, null)(DownloadProduct)