import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchCategoriesStart } from '../../redux/category/category.actions'
import { selectCategories, selectIsFetchingCategories } from '../../redux/category/category.selectors'
import { fetchProductsStart, setShowEditWindow, setEditOptions } from '../../redux/product/product.actions'
import { selectProducts, selectIsFetchingProducts, selectShowEditWindow, selectEditOptions } from '../../redux/product/product.selectors'
import constants from '../../utils/constants.utils'

import Select from '../../components/elements/select/select.component'
import ProductAdminList from '../../components/product/product-admin-list/product-admin-list.component'
import ProductBulkOptions from '../../components/product/product-bulk-options/product-bulk-options.component'
import EditWindow from '../../components/edit-window/edit-window.component';
import ProductEdit from '../../components/product/product-edit/product-edit.component';
import ImagesEdit from '../../components/images-edit/images-edit.component';
import Button from '../../components/elements/button/button.component';
import CreateProduct from '../../components/product/product-create/product-create.component'

class AdminProductsPage extends Component {
    state = {
        selectedCategory: undefined
    }

    componentDidMount() {
        const { fetchCategoriesStart } = this.props;
        fetchCategoriesStart()
    }

    onCategorySelected = async event => {
        if (event.target.value && event.target.value !== '') {
            const { fetchProductsStart } = this.props;
            fetchProductsStart({ categoryId: event.target.value });
            this.setState({ selectedCategory: event.target.value })

        } else {
            this.setState({ selectedCategory: undefined });
        }
    }

    onCreateClick = (setShowEditWindow, setEditOptions) => {
        setShowEditWindow(true);
        setEditOptions({
            type: constants.CREATE_PRODUCT,
            categoryId: this.state.selectedCategory
        });
    }

    switchEditType = (selectEditOptions) => {
        switch (selectEditOptions.type) {
            case constants.EDIT_PRODUCT:
                return <ProductEdit product={selectEditOptions.product} />
            case constants.EDIT_IMAGES:
                return <ImagesEdit product={selectEditOptions.product} />
            case constants.CREATE_PRODUCT:
                return <CreateProduct categoryId={selectEditOptions.categoryId} />
            default:
                return null;
        }
    }

    render() {
        const {
            categories,
            isFetchingCategories,
            products,
            isFetchingProducts,
            showEditWindow,
            selectEditOptions,
            setEditOptions,
            setShowEditWindow
        } = this.props;
        const categoryOptions = !isFetchingCategories && categories ?
            categories.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>
            })
            : []
        return (
            <div className='adminMainPage'>
                <Select onChange={this.onCategorySelected}>
                    <option value="">Selecciona una categoría</option>
                    {categoryOptions}
                </Select>
                {
                    this.state.selectedCategory ? <div>
                        <ProductBulkOptions categoryId={this.state.selectedCategory} />
                        <Button onClick={() => { this.onCreateClick(setShowEditWindow, setEditOptions) }}>Add Product</Button>
                        <ProductAdminList products={products} isFetchingProducts={isFetchingProducts} />
                        {
                            showEditWindow && selectEditOptions
                                ? <EditWindow>
                                    {
                                        this.switchEditType(selectEditOptions)
                                    }
                                </EditWindow>
                                : null
                        }
                    </div> : <span>Selecciona una categoría!</span>
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    isFetchingCategories: selectIsFetchingCategories,
    products: selectProducts,
    isFetchingProducts: selectIsFetchingProducts,
    showEditWindow: selectShowEditWindow,
    selectEditOptions: selectEditOptions
})

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
    fetchProductsStart: categoryId => dispatch(fetchProductsStart(categoryId)),
    setEditOptions: editOptions => dispatch(setEditOptions(editOptions)),
    setShowEditWindow: showEditWindow => dispatch(setShowEditWindow(showEditWindow))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsPage) 