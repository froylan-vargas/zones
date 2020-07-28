import React from 'react';
import { connect } from 'react-redux'

import { setEditOptions, setShowEditWindow } from '../../../redux/product/product.actions'

import { selectFirstImage } from '../../../utils/images.utils'
import constants from '../../../utils/constants.utils'

import Button from '../../elements/button/button.component'

const onEditClick = (setShowEditWindow, setEditOptions, product, type) => {
    const editOptions = { type, product }
    setShowEditWindow(true);
    setEditOptions(editOptions);
}

const ProductAdmin = ({ product, setShowEditWindow, setEditOptions }) => {
    const { id, name, price, isactive, images } = product;
    const image = images ? selectFirstImage(images) : null;
    return (
        <div className='product-admin'>
            <div className='product-admin__box'>
                <div className='product-admin__box--left'>
                    <div className='adminInfoGroup'>
                        <span className='product-admin__label'>Id Producto:</span>
                        <span className='product-admin__value'>{id}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='product-admin__label'>Nombre:</span>
                        <span className='product-admin__value'>{name}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='product-admin__label'>Precio:</span>
                        <span className='product-admin__value'>{price}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='product-admin__label'>Status:</span>
                        <span className='product-admin__value'>{isactive ? 'Activo' : 'Inactivo'}</span>
                    </div>
                    <div className='adminInfoGroup'>
                        <span className='product-admin__label'>Imagenes:</span>
                        <span className='product-admin__value'>{images}</span>
                    </div>
                    <div className='product-admin__options'>
                        <Button onClick={() => { onEditClick(setShowEditWindow, setEditOptions, product, constants.EDIT_PRODUCT) }}>Editar</Button>
                        <Button onClick={() => { onEditClick(setShowEditWindow, setEditOptions, product, constants.EDIT_IMAGES) }}>Images</Button>
                    </div>
                </div>
                <div className='product-admin__box--right'>
                    <img className='product-admin__image' src={image} alt={image} />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setShowEditWindow: (showEditWindow) => dispatch(setShowEditWindow(showEditWindow)),
    setEditOptions: (selectedProduct) => dispatch(setEditOptions(selectedProduct))
})

export default connect(null, mapDispatchToProps)(ProductAdmin)