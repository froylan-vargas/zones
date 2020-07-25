import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { fetchCategoriesStart } from '../../redux/category/category.actions'
import { selectCategories, selectIsFetchingCategories } from '../../redux/category/category.selectors'
import { fetchProductsStart } from '../../redux/product/product.actions'
import { selectProducts, selectIsFetchingProducts } from '../../redux/product/product.selectors'

import Select from '../../components/elements/select/select.component'
import ProductAdminList from '../../components/product/product-admin-list/product-admin-list.component'
import ProductBulkOptions from '../../components/product/product-bulk-options/product-bulk-options.component'

class AdminProductsPage extends Component {
    state = {
        selectedCategory: undefined
    }

    componentDidMount() {
        const { fetchCategoriesStart } = this.props;
        fetchCategoriesStart()
    }

    onCategorySelected = async event => {
        if (event.target.value && event.target.value!=='') {
            const { fetchProductsStart } = this.props;
            fetchProductsStart({ categoryId: event.target.value });
            this.setState({ selectedCategory: event.target.value })
            
        } else {
            this.setState({ selectedCategory: undefined });
        }
    }

    render() {
        const { categories, isFetchingCategories, products, isFetchingProducts } = this.props;
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
                {this.state.selectedCategory ? <div>
                    <ProductBulkOptions categoryId={this.state.selectedCategory} />
                    <ProductAdminList products={products} isFetchingProducts={isFetchingProducts} />
                </div> : <span>Selecciona una categoría!</span>}
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    isFetchingCategories: selectIsFetchingCategories,
    products: selectProducts,
    isFetchingProducts: selectIsFetchingProducts
})

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
    fetchProductsStart: categoryId => dispatch(fetchProductsStart(categoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductsPage) 