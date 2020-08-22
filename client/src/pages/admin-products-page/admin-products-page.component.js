import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import constants from '../../utils/constants.utils';
import { selectProducts, selectIsFetchingProducts, selectEditOptions } from '../../redux/product/product.selectors';
import { setEditOptions } from '../../redux/product/product.actions';
import { fetchCategoriesStart } from '../../redux/category/category.actions';

import ProductModify from '../../components/product/product-modify/product.modify.component';
import ImagesEdit from '../../components/images-edit/images-edit.component';
import ProductOptions from '../../components/product/product-options/product-options.component';
import ProductAdminList from '../../components/product/product-admin-list/product-admin-list.component';
import EditWindow from '../../components/edit-window/edit-window.component';
import ProductUpload from '../../components/product/product-upload/product-upload.component';
import ProductDownload from '../../components/product/product-download/product-download.component';

const AdminProductsPage = ({ fetchCategoriesStart, products, isFetchingProducts, editOptions }) => {

    useEffect(() => {
        async function fetch() {
            await fetchCategoriesStart();
        };
        fetch();
    }, [fetchCategoriesStart]);

    const switchEditType = () => {
        switch (editOptions.type) {
            case constants.EDIT_PRODUCT:
                return <ProductModify editOptions={editOptions} />
            case constants.EDIT_IMAGES:
                return <ImagesEdit productId={editOptions.product.id} />
            case constants.IMAGES_UPLOAD:
                return <ImagesEdit />
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

    return (
        <div className='admin-products-page'>
            {
                editOptions && editOptions.showEditWindow
                    ? <EditWindow purpose={editOptions.purpose}>
                        {
                            switchEditType()
                        }
                    </EditWindow>
                    : null
            }
            <ProductOptions />
            <ProductAdminList products={products} isFetchingProducts={isFetchingProducts} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
    isFetchingProducts: selectIsFetchingProducts,
    editOptions: selectEditOptions
})

const mapDispatchToProps = dispatch => ({
    setEditOptions: editOptions => dispatch(setEditOptions(editOptions)),
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsPage) 