import React from 'react'

import Product from '../product/product.component'

const ProductList = () => {
    return (
        <div className="product-list">
            <div className="row">
                <div className="col-1-of-3">
                    <div className="product-list__product-box">
                        <Product />
                    </div>
                </div>
                <div className="col-1-of-3">
                    <div className="product-list__product-box">
                        <Product />
                    </div>
                </div>
                <div className="col-1-of-3">
                    <div className="product-list__product-box">
                        <Product />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;