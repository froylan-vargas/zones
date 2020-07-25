import React from 'react'
import { Route, Link } from 'react-router-dom'

import AdminProductsPage from '../../pages/admin-products-page/admin-products-page.component'
import AdminMainContent from '../../components/admin-main-content/admin-main-content.component'

const AdminMainpage = ({match}) => {
    return (        
        <div className="admin-main-page">
            <Link to={`/`}>Home</Link><br />
            <Link to={`${match.url}/products`}>Manage products</Link><br />
            <Link to={`${match.url}`}>Admin Dashboard</Link><br />
            <Route exact path={`${match.path}`} component={AdminMainContent} />
            <Route path={`${match.path}/products`} component={AdminProductsPage} />
        </div>
    )
}

export default AdminMainpage