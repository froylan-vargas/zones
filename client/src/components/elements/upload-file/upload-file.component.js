import React from 'react';

import FormError from '../form-error/form-error.component';

const UploadFile = ({
    onSelectFile,
    fieldErrors,
    value,
    accept
}) => {
    return (
        <div key={value} className="form-group">
            <input type="file" name="file" accept={accept} id="file" className="upload-file" onChange={onSelectFile} />
            <label htmlFor='file'>
                {value ?
                    <i className="fa fa-upload">&nbsp;&nbsp;{value}</i>
                    : <i className="fa fa-upload" />
                }
            </label>
            {fieldErrors['file'].length ? <FormError errors={fieldErrors['file']} /> : null}
        </div>
    )
}

export default UploadFile;