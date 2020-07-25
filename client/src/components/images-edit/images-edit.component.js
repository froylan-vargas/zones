import React from 'react'

const ImagesEdit = ({product:{images}}) => {
    return (
        <div className='images-edit'>
            {images}
        </div>
    )
}

export default ImagesEdit;