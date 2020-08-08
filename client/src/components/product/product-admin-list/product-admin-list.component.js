import React from 'react';

import ProductAdmin from '../product-admin/product-admin.component';

/* const createProductsList = (products) => {
    console.log('im here');
    const rows = [];
    console.log(products.length)
    for (let i = 0; i < products.length; i = i + 2) {
        rows.push(<div key={i} className="row">{i}</div>)
    }
    console.log(rows)
    return rows;
    
} */

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