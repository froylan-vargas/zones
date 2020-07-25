import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShowEditWindow, selectEditOptions } from '../../../redux/product/product.selectors';
import ProductAdmin from '../product-admin/product-admin.component';
import EditWindow from '../../edit-window/edit-window.component';
import ProductEdit from '../product-edit/product-edit.component';
import ImagesEdit from '../../images-edit/images-edit.component';

const createProductsList = (products) => {
    return products.map(product => {
        return <ProductAdmin key={product.id} product={product} />
    })
}

const ProductAdminList = ({ products, isFetchingProducts, showEditWindow, selectEditOptions }) => {
    return (
        <div className='product-admin-list'>
            {
                !isFetchingProducts && products
                    ? createProductsList(products)
                    : null
            }
            {showEditWindow && selectEditOptions
                ? <EditWindow>
                    {selectEditOptions.type === 'product'
                        ? <ProductEdit product={selectEditOptions.product} />
                        : <ImagesEdit product={selectEditOptions.product} />}
                </EditWindow>
                : null}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    showEditWindow: selectShowEditWindow,
    selectEditOptions: selectEditOptions
})

export default connect(mapStateToProps)(ProductAdminList);