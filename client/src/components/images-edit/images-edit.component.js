import React, { useState } from 'react'

import CustomCarousel from '../elements/carousel/carousel.component';
import UploadFile from '../elements/upload-file/upload-file.component';
import constants from '../../utils/constants.utils';

const ImagesEdit = ({ product }) => {

    const [file, setFile] = useState({});
    const [fieldErrors, setFieldError] = useState({
        file: [],
        optionId: []
    });

    /* const validateUpload = () => {
        return file.name
    } */

    const images = [
        /* { url: "https://zones-images.s3.us-east-2.amazonaws.com/jana.png" },
        { url: "https://zones-images.s3.us-east-2.amazonaws.com/sabina.png" },
        { url: "https://zones-images.s3.us-east-2.amazonaws.com/dana.png" } */
    ];

    let carouselInfo = { caption: product.name };

    carouselInfo.items = images.map((image, i) => {
        return (
            <img key={i} src={image.url} alt={product.name} />
        )

    })

    return (
        <div className='images-edit'>
            <UploadFile
                accept={constants.IMAGE_FILE_TYPES}
                value={file.name}
                fieldErrors={fieldErrors}
                setFile={setFile}
                setFieldError={setFieldError}
                label={'Seleccione una imágen:'}
            />
            {
                images.length ? <CustomCarousel data={carouselInfo} /> : null
            }
        </div>
    )
}

export default ImagesEdit;