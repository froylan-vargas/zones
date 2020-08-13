import React from 'react';

import Promotion from '../../promotion/promotion.component';
import Navigation from '../../elements/navigation/navigation.component';

const Header = () => {
    return (
        <div className="header">
            <Navigation />
            <div className="promotion-wrapper">
                <div className="promotions">
                    <Promotion />
                </div>
            </div>
        </div>
    )
}

export default Header;