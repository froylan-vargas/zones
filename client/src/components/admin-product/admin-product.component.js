import React from 'react';
import { connect } from 'react-redux'

import { setEditOptions, setShowEditWindow } from '../../redux/product/product.actions'

import { selectFirstImage } from '../../utils/images.utils'

import Button from '../button/button.component'

const onEditClick = (setShowEditWindow, selectEditOptions, product, type) => {
    const editOptions = { type, product }
    setShowEditWindow(true);
    selectEditOptions(editOptions);
}

const AdminProduct = ({ product, setShowEditWindow, setEditOptions }) => {
    const { id, name, price, isActive, images } = product;
    const image = selectFirstImage(images);
    return (
        <div className='admin-product'>
            <div className='admin-product__box'>
                <div className='admin-product__box--left'>
                    <div className='adminInfoGroup'>
                        <span className='admin-product__label'>Id Producto:</span>
                        <span className='admin-product__value'>{id}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='admin-product__label'>Nombre:</span>
                        <span className='admin-product__value'>{name}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='admin-product__label'>Precio:</span>
                        <span className='admin-product__value'>{price}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='admin-product__label'>Status:</span>
                        <span className='admin-product__value'>{isActive ? 'Activo' : 'Inactivo'}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='admin-product__label'>Imagenes:</span>
                        <span className='admin-product__value'>{images}</span>
                    </div>
                    <div className='admin-product__options'>
                        <Button onClick={() => { onEditClick(setShowEditWindow, setEditOptions, product, 'product') }}>Editar</Button>
                        <Button onClick={() => { onEditClick(setShowEditWindow, setEditOptions, product, 'images') }}>Images</Button>
                    </div>
                </div>
                <div className='admin-product__box--right'>
                    <img className='admin-product__image' src={image} alt='product image' />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setShowEditWindow: (showEditWindow) => dispatch(setShowEditWindow(showEditWindow)),
    setEditOptions: (selectedProduct) => dispatch(setEditOptions(selectedProduct))
})

export default connect(null, mapDispatchToProps)(AdminProduct)