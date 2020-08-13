import React from 'react'

import CustomCarousel from '../elements/carousel/carousel.component';

const ImagesEdit = ({ product }) => {

    const images = [
        { url: "https://zones-images.s3.us-east-2.amazonaws.com/jana.png" },
        { url: "https://zones-images.s3.us-east-2.amazonaws.com/sabina.png" },
        { url: "https://zones-images.s3.us-east-2.amazonaws.com/dana.png" }
    ];

    let carouselInfo = { caption: product.name };
    
    carouselInfo.items = images.map((image,i) => {
        return (
            <img key={i} src={image.url} alt={product.name} />
        ) 
        
    })
    
    return (
        <div className='images-edit'>
            {
                images.length ? <CustomCarousel data={carouselInfo} /> : null
            }
        </div>
    )
}

export default ImagesEdit;