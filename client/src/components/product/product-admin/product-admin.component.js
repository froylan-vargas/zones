import React from 'react';
import { connect } from 'react-redux'

import { setEditOptions } from '../../../redux/product/product.actions'
import constants from '../../../utils/constants.utils'

import Button from '../../elements/button/button.component'

const ProductAdmin = ({ product, setEditOptions }) => {
    const { id, name, price, isActive, description, priority } = product;

    const displayDescription = description.length < constants.DESCRIPTION_MAX_CHARS ? description : `${description.substring(0,constants.DESCRIPTION_MAX_CHARS - 1)}...`; 

    const onEditClick = (type, purpose, method = '') => {
        const editOptions = { type, product, showEditWindow: true, method, purpose }
        setEditOptions(editOptions);
    }

    return (
        <div className='product-admin'>
            <div className='product-admin__box'>
                <div className='product-admin__box--left'>
                    <div className='product-admin__box--left__content'>
                        <div>
                            <span className='product-admin__label'>Id Producto:</span>
                            <span className='product-admin__value'>{id}</span>
                        </div>
                        <div>
                            <span className='product-admin__label'>Nombre:</span>
                            <span className='product-admin__value'>{name}</span>
                        </div>
                        <div>
                            <span className='product-admin__label'>Descripción:</span>
                            <span className='product-admin__value'>{displayDescription}</span>
                        </div>
                        <div>
                            <span className='product-admin__label'>Precio:</span>
                            <span className='product-admin__value'>${price}</span>
                        </div>
                        <div>
                            <span className='product-admin__label'>Prioridad:</span>
                            <span className='product-admin__value'>{priority}</span>
                        </div>
                        <div>
                            <span className='product-admin__label'>Estatus:</span>
                            <span className='product-admin__value'>{isActive ? 'Activo' : 'Inactivo'}</span>
                        </div>
                    </div>
                    <div className='product-admin__options'>
                        <Button modifier={'white'} onClick={() => { onEditClick(constants.EDIT_PRODUCT, 'Editar Producto', 'edit') }}>Editar</Button>
                        <Button modifier={'white'} onClick={() => { onEditClick(constants.EDIT_IMAGES, 'Imagenes De Producto') }}>Imágenes</Button>
                    </div>
                </div>
                <div className='product-admin__box--right'>
                    <div className='product-admin__box--right__content'>
                        <img className='product-admin__image' src='https://uy.emedemujer.com/wp-content/uploads/sites/4/2019/07/flor-de-lis-770x504.jpg' alt='the admin' />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setEditOptions: (selectedProduct) => dispatch(setEditOptions(selectedProduct))
})

export default connect(null, mapDispatchToProps)(ProductAdmin)