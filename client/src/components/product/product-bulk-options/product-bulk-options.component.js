import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import download from 'downloadjs';

import { setResultNotification } from '../../../redux/notification/notification.actions';
import { setEditOptions } from '../../../redux/product/product.actions';
import notificationUtils from '../../../utils/notification.utils';
import constants from '../../../utils/constants.utils';

const ProductBulkOptions = ({  setNotification, setEditOptions }) => {

    const onFileDownload = async () => {
        /* const res = await axios.get(`/api/download/products/${categoryId}`, { responseType: 'blob' });
        if (res.data.error) {
            setNotification(notificationUtils.createNotification(res, ''));
        } else {
            const blob = new Blob([res.data]);
            download(blob, 'Lista_Productos.xlsx');
        } */
    }

    const onImagesUpload = async () => {
        console.log('Images upload');
    }

    const uploadClick = () => {
        setEditOptions({
            type: constants.UPLOAD_PRODUCT,
            showEditWindow: true
        });
    }

    return (
        <div className='product-bulk-options'>
            <button type="button" onClick={uploadClick}>Upload products</button>
            <button type="button" onClick={() => { onFileDownload() }}>Download</button>
            <button type="button" onClick={() => { onImagesUpload() }}>Upload Images</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setNotification: (notification) => dispatch(setResultNotification(notification)),
    setEditOptions: (editOptions) => dispatch(setEditOptions(editOptions))
})

export default connect(null, mapDispatchToProps)(ProductBulkOptions)