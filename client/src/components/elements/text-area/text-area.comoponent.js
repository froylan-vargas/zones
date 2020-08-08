import React from 'react';
import FormError from '../form-error/form-error.component';

const TextArea = ({
    name,
    labelValue,
    defaultValue,
    onChange,
    placeholder,
    errors
}) => {
    return (
        <div className="form-group">
            <label className="form-group__label" htmlFor={name}>{labelValue}</label>
            <textarea
                className="form-group__input"
                rows="2"
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
            ></textarea>
            {
                errors.length ? <FormError errors={errors} /> : null
            }
        </div>

    )
}

export default TextArea;