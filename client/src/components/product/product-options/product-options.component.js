import React from 'react';
import { connect } from 'react-redux';

import { setEditOptions } from '../../../redux/product/product.actions';
import { setSelectedCategory } from '../../../redux/category/category.actions';
import constants from '../../../utils/constants.utils';

import Button from '../../elements/button/button.component'

const ProductOptions = ({ setEditOptions, setCategory }) => {

    const product = {
        id: '0',
        isactive: true,
        name: '',
        description: '',
        priority: 0,
        price: undefined
    }

    const createEditOptions = (type) => {
        switch (type) {
            case constants.CREATE_PRODUCT:
                return {
                    type,
                    product,
                    method: 'create',
                    showEditWindow: true,
                    purpose: 'Nuevo Producto'
                }
            case constants.UPLOAD_PRODUCT:
                return {
                    type,
                    showEditWindow: true,
                    purpose: 'Subir Productos'
                }
            case constants.DOWNLOAD_PRODUCT:
                return {
                    type,
                    showEditWindow: true,
                    purpose: 'Descargar Productos'
                }
            case constants.IMAGES_UPLOAD:
                return {
                    type,
                    showEditWindow: true,
                    purpose: 'Subir Imágenes'
                }
            default:
                return {}
        }
    }

    const buttonClick = (type) => {
        setEditOptions(createEditOptions(type));
        setCategory("0");
    }

    return (
        <div className='product-options'>
            <Button modifier={'white desktop'} onClick={() => buttonClick(constants.UPLOAD_PRODUCT)}>Subir</Button>
            <Button modifier={'white desktop'} onClick={() => buttonClick(constants.DOWNLOAD_PRODUCT)}>Descargar</Button>
            <Button modifier={'white desktop'} onClick={() => buttonClick(constants.IMAGES_UPLOAD)}>Subir imagenes</Button>
            <Button modifier={'white'} onClick={() => buttonClick(constants.CREATE_PRODUCT)}>Agregar</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setEditOptions: (editOptions) => dispatch(setEditOptions(editOptions)),
    setCategory: (selectedCategory) => dispatch(setSelectedCategory(selectedCategory))
})

export default connect(null, mapDispatchToProps)(ProductOptions)