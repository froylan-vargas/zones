import React from 'react';

import { Switch } from '@material-ui/core';

const FormSwitch = ({
    label,
    checked,
    onChange
}) => {
    return (
        <div className='form-group'>
            <label className='form-group__label'>
                {label}
            </label>
            <Switch className='form-group__input' name='isChecked' checked={checked} onChange={onChange} />
        </div>
    )
}

export default FormSwitch;