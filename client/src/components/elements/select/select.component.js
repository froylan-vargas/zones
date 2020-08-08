import React from 'react'

const Select = ({ children, ...otherProps }) => {
    return (
        <select className="form-group__input"  {...otherProps}>
            {children}
        </select>
    )
}

export default Select;