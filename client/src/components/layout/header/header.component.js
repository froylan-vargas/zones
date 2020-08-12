import React from 'react';

import Promotion from '../../promotion/promotion.component';
import Navigation from '../../elements/navigation/navigation.component';

const Header = () => {
    return (
        <div className="header">
            <Navigation />
            <div className="header__promotions">
                <Promotion />
            </div>
        </div>
    )
}

export default Header;