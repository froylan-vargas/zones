import React from 'react'

import Header from '../../components/layout/header/header.component'
import ProductList from '../../components/product/product-list/product-list.component'
import Footer from '../../components/layout/footer/footer.component'

const HomePage = () => {
    return (
        <div className="homepage">
           <Header />
           <ProductList />
           <Footer />
        </div>
    )
}

export default HomePage;

