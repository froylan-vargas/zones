import React from 'react'

import Header from '../../components/header/header.component'
import ProductList from '../../components/product-list/product-list.component'
import Footer from '../../components/footer/footer.component'

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

