import React from 'react'

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
                errors.length ? <div style={{ backgroundColor: 'blue' }}>{errors[0]}</div>
                    : <div style={{ backgroundColor: 'green' }}>No hay error</div>
            }
        </div>
    )
}

export default FormGroup