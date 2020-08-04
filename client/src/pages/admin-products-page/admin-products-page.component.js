import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import constants from '../../utils/constants.utils';
import { selectProducts, selectIsFetchingProducts, selectEditOptions } from '../../redux/product/product.selectors';
import { fetchProductsStart, setEditOptions } from '../../redux/product/product.actions';
import { fetchCategoriesStart } from '../../redux/category/category.actions';

import ProductModify from '../../components/product/product-modify/product.modify.component';
import ImagesEdit from '../../components/images-edit/images-edit.component';
import ProductBulkOptions from '../../components/product/product-bulk-options/product-bulk-options.component';
import Button from '../../components/elements/button/button.component';
import ProductAdminList from '../../components/product/product-admin-list/product-admin-list.component';
import EditWindow from '../../components/edit-window/edit-window.component';
import ProductUpload from '../../components/product/product-upload/product-upload.component';
import ProductDownload from '../../components/product/product-download/product-download.component';

class AdminProductsPage extends Component {

    componentDidMount() {
        const { fetchProductsStart, fetchCategoriesStart } = this.props;
        fetchProductsStart();
        fetchCategoriesStart();
    }

    onCreateClick = (setEditOptions) => {
        const product = {
            id: '0',
            isactive: true,
            name: '',
            price: undefined
        }

        setEditOptions({
            type: constants.CREATE_PRODUCT,
            product,
            method: 'create',
            showEditWindow: true
        });
    }

    switchEditType = (editOptions) => {
        switch (editOptions.type) {
            case constants.EDIT_PRODUCT:
                return <ProductModify editOptions={editOptions} />
            case constants.EDIT_IMAGES:
                return <ImagesEdit product={editOptions.product} />
            case constants.CREATE_PRODUCT:
                return <ProductModify editOptions={editOptions} />
            case constants.UPLOAD_PRODUCT:
                return <ProductUpload editOptions={editOptions} />
            case constants.DOWNLOAD_PRODUCT:
                return <ProductDownload editOptions={editOptions} />
            default:
                return null;
        }
    }

    render() {
        const { setEditOptions, products, isFetchingProducts, editOptions } = this.props;
        return (
            <div className='admin-products-page'>
                <ProductBulkOptions categoryId={'1'} />
                <Button onClick={() => { this.onCreateClick(setEditOptions) }}>Add Product</Button>
                <ProductAdminList products={products} isFetchingProducts={isFetchingProducts} />
                {
                    editOptions && editOptions.showEditWindow
                        ? <EditWindow>
                            {
                                this.switchEditType(editOptions)
                            }
                        </EditWindow>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    isFetchingProducts: selectIsFetchingProducts,
    editOptions: selectEditOptions
})

const mapDispatchToProps = dispatch => ({
    fetchProductsStart: () => dispatch(fetchProductsStart()),
    setEditOptions: editOptions => dispatch(setEditOptions(editOptions)),
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsPage) 