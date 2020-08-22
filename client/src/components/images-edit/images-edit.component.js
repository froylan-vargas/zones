import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CustomCarousel from '../elements/carousel/carousel.component';
import UploadFile from '../elements/upload-file/upload-file.component';
import constants from '../../utils/constants.utils';
import productValidators from '../../utils/validators/product-validators.utils';

const ImagesEdit = ({ productId }) => {

    const [product, setProduct] = useState({});
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            const res = await axios.get(`/api/product/${productId}`);
            setProduct(res.data);
        }
        fetchProduct();
    }, [productId]);

    const [file, setFile] = useState({});
    const [fieldErrors, setFieldError] = useState({
        file: []
    });

    const images = product.images ? JSON.parse(product.images) : [];

    const deleteImage = async (imageName) => {
        setFetching(true);
        const signedUrl = await axios.get(`/api/image/remove?name=${imageName}&id=${product.id}`);
        const savedImage = await axios.post(`/api/product/imageupdate`, {
            id: product.id,
            name: imageName,
            action: 'remove'
        });
        if (!savedImage.data.error) {
            const updatedProduct = { ...product, images: JSON.stringify(savedImage.data) };
            setProduct(updatedProduct);
            await axios.delete(signedUrl.data.url);
            setFetching(false);
        } else {
            console.log(savedImage.data.error);
        }
    }

    const carouselInfo = images.map((image) => {
        const url = `${constants.ASSETS_BUCKET}${product.id}/${image.name}`;
        return (
            <div className="images-edit__slide" key={image.name}>
                <img className="images-edit__image" src={url} alt={image.name} />
                <button className="images-edit__remove" onClick={() => { deleteImage(image.name) }}>X</button>
            </div>
        );
    });

    const validateUpload = () => {
        return file.name
    };

    const uploadFile = async () => {
        const savedImage = await axios.post(`/api/product/imageupdate`, {
            id: product.id,
            name: file.name,
            action: 'add'
        });
        if (!savedImage.data.error) {
            const updatedProduct = { ...product, images: JSON.stringify(savedImage.data) };
            const signedUrl = await axios.get(`/api/image/create?name=${file.name}&id=${product.id}`);
            const { url } = signedUrl.data;
            try {
                const uploadRes = await axios.put(url, file, {
                    headers: {
                        'Content-Type': file.type
                    }
                });
                if (uploadRes.status === 200) {
                    setProduct(updatedProduct);
                    setFile({});
                }
            } catch (err) {
                console.log(err);
            }
        }
        else {
            console.log(savedImage.data.error);
        }
    };

    const onUpload = event => {
        event.preventDefault();
        if (validateUpload()) uploadFile();
        else {
            setFieldError({
                ...fieldErrors,
                file: productValidators.validateFile(file)
            });
        }
    };

    return (
        <div className='images-edit'>
            {images.length < 3 &&
                <div className="images-edit__upload">
                    <UploadFile
                        accept={constants.IMAGE_FILE_TYPES}
                        value={file.name}
                        fieldErrors={fieldErrors}
                        setFile={setFile}
                        setFieldError={setFieldError}
                        label={''}
                        onUpload={onUpload}
                    />
                </div>
            }
            <div style={{height:"30rem"}}>
            {
                images.length && !fetching ? <CustomCarousel data={carouselInfo} /> : null
            }
            </div>  
        </div>
    )
}

export default ImagesEdit;  