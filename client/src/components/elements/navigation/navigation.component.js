import React from 'react';

import CustomLink from '../../elements/custom-link/custom-link.component';
import Logo from '../../logo/logo.component';
import ProfileIcon from '../../elements/profile-icon/profile-icon.component';
import { ReactComponent as ShoppingIcon } from '../../../assets/img/shopping-bag.svg'

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="navigation--left">
                <Logo/>
            </div>
            <div className="navigation--right">
                <CustomLink to={`/admin`}>Ingresar</CustomLink>
                <ProfileIcon />
            </div>
            <div className="cart-icon">
                <ShoppingIcon className="shopping-icon" />
                <span className='item-count'>2</span>
            </div>

        </nav>
    )
}

export default Navigation;