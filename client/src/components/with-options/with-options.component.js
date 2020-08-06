import React from 'react';
import FormError from '../elements/form-error/form-error.component'

const WithOptions = WrappedComponent => ({ options, setSelectedValue, fieldErrors, setFieldError, label }) => {

    const createOptions = () => {
        const optionsArray = options.map(option => {
            return <option key={option.id} value={option.id}>{option.name}</option>
        })
        optionsArray.unshift(<option key="0" value="0">Seleccione un valor</option>);
        return optionsArray;
    }

    const onOptionChange = (event) => {
        const optionId = event.target.value;
        setSelectedValue(optionId);
        setFieldError({ ...fieldErrors, optionId: [] });
    }

    return (
        <div>
            <label className='form-group__label' htmlFor={label}>{label}</label>
            <WrappedComponent name={label} onChange={onOptionChange}>
                {
                    options ? createOptions() : null
                }
            </WrappedComponent>
            {
                fieldErrors['optionId'] ? <FormError errors={fieldErrors['optionId']} /> : null
            }

        </div>
    )
}

export default WithOptions;