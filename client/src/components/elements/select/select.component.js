import React from 'react'

const Select = ({ children, ...otherProps }) => {
    return (
        <div className="select">
            <select  {...otherProps}>
                {children}
            </select>
        </div>
    )
}

export default Select;