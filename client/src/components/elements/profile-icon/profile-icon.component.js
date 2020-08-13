import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ProfileIcon = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return <div className="profile-icon">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span"
                data-toggle='dropdown'
                aria-expanded={dropdownOpen}>
                <figure className="profile-icon__shape">
                    <figcaption className="profile-icon__shape__caption">FV</figcaption>
                </figure>
            </DropdownToggle>
            <DropdownMenu className="profile-icon__menu">
                <DropdownItem className="profile-icon__item">Pedidos</DropdownItem>
                <DropdownItem className="profile-icon__item">Cerrar sesión</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
}

export default ProfileIcon;