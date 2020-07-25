import React from 'react'

import Promotion from '../../promotion/promotion.component'
import Logo from '../../logo/logo.component'

const Header = () => {
    return (
        <div className="header">
            <Logo />
            <div className="header__promotions">
                <Promotion />
            </div>
        </div>
    )
}

export default Header;