import React, { useState } from 'react'
import axios from 'axios'

import productValidators from '../../../utils/validators/product-validators.utils'

import Button from '../../elements/button/button.component'
import FormGroup from '../../elements/form-group/form-group.component'

const ProductEdit = ({ product }) => {

    const [editProduct, setProductProperties] = useState({
        name: product.name,
        price: product.price,
        isactive: product.isactive
    });

    const [fieldErrors, setFieldError] = useState({
        name: [],
        price: [],
        isactive: []
    })

    const onInputChange = (event) => {
        if (event.target.name === 'isactive') {
            setProductProperties({ ...editProduct, isactive: event.target.checked })
        } else {
            const { name, value } = event.target
            setProductProperties({ ...editProduct, [name]: value });
            validateInput(name, value);
        }
    }

    const validateInput = (name, value) => {
        switch (name) {
            case 'name':
                return setFieldError({ ...fieldErrors, [name]: productValidators.validateProductName(value) });
            case 'price':
                return setFieldError({ ...fieldErrors, [name]: productValidators.validatePrice(value) });
            default:
                break;
        }
    }

    const saveProduct = () => {
        console.log('saving product!');
    }

    const onSave = (e) => {
        e.preventDefault();
        if (fieldErrors.name.length || fieldErrors.price.length) return;
        saveProduct();
    }

    return (
        <div className='product-edit'>
            <form className='form' method="post" action="#" id="#">
                <FormGroup
                    name='name'
                    labelValue='Producto'
                    inputType='text'
                    defaultValue={editProduct.name}
                    onChange={onInputChange}
                    errors={fieldErrors['name']}
                />
                <FormGroup
                    name='price'
                    labelValue='Precio'
                    inputType='number'
                    defaultValue={editProduct.price}
                    onChange={onInputChange}
                    errors={fieldErrors['price']}
                />
                <FormGroup
                    name='isactive'
                    labelValue='Estatus'
                    inputType='checkbox'
                    defaultValue={editProduct.isactive}
                    onChange={onInputChange}
                    errors={fieldErrors['isactive']}
                />
                <div className='form__options'>
                    <Button onClick={onSave}>Save</Button>
                </div>
            </form>
        </div>
    )
}

export default ProductEdit