import React from 'react'

import Promotion from '../promotion/promotion.component'

const Header = () => {
    return (
        <div className="header">
            <span className="logo">
                Zones
            </span>
            <div className="header__promotions">
                <Promotion />
            </div>
        </div>
    )
}

export default Header;