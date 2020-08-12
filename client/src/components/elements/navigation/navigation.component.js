import React from 'react';

import CustomLink from '../../elements/custom-link/custom-link.component'
import Logo from '../../logo/logo.component';

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="navigation--left">
                <Logo />
            </div>
            <div className="navigation--right">
                <CustomLink to={`/admin`}>Ingresar</CustomLink>
                <figure className="navigation__shape">
                    <figcaption class="navigation__shape__caption">FV</figcaption>
                </figure>
                <div className="navigation__user-menu">
                    Hola desde el menu de usuario
                </div>
            </div>
        </nav>
    )
}

export default Navigation;