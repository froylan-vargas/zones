import React from 'react'
import FormError from '../form-error/form-error.component'

const FormGroup = ({
    name,
    labelValue,
    inputType,
    defaultValue,
    onChange,
    placeholder,
    errors
}) => {
    return (
        <div className='form-group'>
            <label className='form-group__label' htmlFor={name}>{labelValue}</label>
            <input
                type={inputType}
                required
                className='form-group__input'
                name={name}
                id={name}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
                checked={defaultValue}
            />
            {
                errors.length ? <FormError errors={errors} /> : null
            }
        </div>
    )
}

export default FormGroup