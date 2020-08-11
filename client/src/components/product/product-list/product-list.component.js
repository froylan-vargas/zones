import React from 'react'

import Product from '../product/product.component'

const ProductList = () => {
    return (
        <div className="product-list">
            <div className="product-list__product-box">
                <Product />
            </div>
            <div className="product-list__product-box">
                <Product />
            </div>
            <div className="product-list__product-box">
                <Product />
            </div>
        </div>
    )
}

export default ProductList;