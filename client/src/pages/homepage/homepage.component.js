import React from 'react'

import Header from '../../components/header/header.component'
import ProductList from '../../components/product-list/product-list.component'

const HomePage = () => {
    return (
        <div className="homepage">
           <Header />
           <ProductList />
        </div>
    )
}

export default HomePage;

