import React from 'react'

const Button = ({children, ...otherProps}) => {
    return (
        <button className={`button button--${otherProps.modifier}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;