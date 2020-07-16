import React from 'react'

import Header from '../../components/header/header.component'
import CategoryList from '../../components/category-list/category-list.component'

const HomePage = () => {
    return (
        <div className="homepage">
           <Header />
           <CategoryList />
        </div>
    )
}

export default HomePage;

