import React from 'react';

const FormError = ({errors}) => {
    return (
        <div className='form-error'>
            {errors[0]}
        </div>
    )
}

export default FormError;