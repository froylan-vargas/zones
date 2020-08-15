import React from 'react';
import { Route } from 'react-router-dom';

import AdminProductsPage from '../../pages/admin-products-page/admin-products-page.component';
import AdminMainContent from '../../components/admin-main-content/admin-main-content.component';
import CustomLink from '../../components/elements/custom-link/custom-link.component';

const AdminMainpage = ({ match }) => {
    return (
        <div className="admin-main-page">
            <div className='admin-main-page__menu'>
                <CustomLink to={`/`}>Zones</CustomLink>
                <CustomLink to={`${match.url}`}>Tablero</CustomLink>
                <CustomLink to={`${match.url}/products`}>Administrar productos</CustomLink>
            </div>
            <div className='admin-main-page__content'>
                <Route exact path={`${match.path}`} component={AdminMainContent} />
                <Route path={`${match.path}/products`} component={AdminProductsPage} />
            </div>
        </div>
    )
}

console.log('mini');

export default AdminMainpage