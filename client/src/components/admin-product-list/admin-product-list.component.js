import React from 'react'

import AdminProduct from '../admin-product/admin-product.component'

const AdminProductList = ({products,isFetchingProducts}) => {
    return (
        <div className="admin-product-list">
            <AdminProduct />
        </div>
    )
}

export default AdminProductList;