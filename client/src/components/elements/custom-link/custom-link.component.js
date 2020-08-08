import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ ...otherProps }) => {
    return (
        <Link className="custom-link" {...otherProps}></Link>
    )
}

export default CustomLink;