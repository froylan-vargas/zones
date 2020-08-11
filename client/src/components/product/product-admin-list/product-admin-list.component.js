import React from 'react';

import ProductAdmin from '../product-admin/product-admin.component';

const createProductsList = (products) => {
    return products.map(product => {
        return <ProductAdmin key={product.id} product={product} />
    })
}

const ProductAdminList = ({ products, isFetchingProducts }) => {
    return (
        <div className='product-admin-list'>
            
                {
                    !isFetchingProducts && products
                        ? createProductsList(products)
                        : null
                }


        </div>
    )
}

export default ProductAdminList;