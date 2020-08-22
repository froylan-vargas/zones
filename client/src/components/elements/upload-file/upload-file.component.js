import React from 'react';

import FormError from '../form-error/form-error.component';
import Button from '../button/button.component'

const UploadFile = ({
    setFile,
    label,
    fieldErrors,
    setFieldError,
    value,
    accept,
    onUpload
}) => {

    const onSelectFile = event => {
        if (event.target.files[0]) {
            setFieldError({
                ...fieldErrors,
                file: []
            });
        }
        setFile(event.target.files[0]);
    }

    return (
        <div key={value} className="form-group">
            <label className='form-group__label'>{label}</label>
            <input type="file" name="file" accept={accept} id="file" className="upload-file" onChange={onSelectFile} />
            <div className="upload-options">
                <label className="upload-label" htmlFor='file'>
                    {value ?
                        <i className="fa fa-upload">&nbsp;&nbsp;{value}</i>
                        : <i className="fa fa-upload" />
                    }
                </label>
                <Button modifier={'white'} onClick={onUpload}>Subir</Button>
            </div>
            {fieldErrors['file'].length ? <FormError errors={fieldErrors['file']} /> : null}
        </div>
    )
}

export default UploadFile;