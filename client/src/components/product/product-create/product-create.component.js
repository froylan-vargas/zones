import React, { useState } from 'react'

import productValidators from '../../../utils/validators/product-validators.utils'

import FormGroup from '../../elements/form-group/form-group.component'
import Button from '../../elements/button/button.component'

const CreateProduct = ({ categoryId }) => {

    const [product, setProductProperties] = useState({
        name: '',
        price: undefined
    });

    const [fieldErrors, setFieldError] = useState({
        name: [],
        price: []
    });

    const onInputChange = (event) => {
        const { name, value } = event.target
        setProductProperties({ ...product, [name]: value });
        validateInput(name, value);
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

    const validateFullProduct = () => {
        const nameErrors = productValidators.validateProductName(product.name);
        const priceErrors = productValidators.validatePrice(product.price);
        return !nameErrors.length && !priceErrors.length
    }

    const saveProduct = () => {
        console.log('saving new product');
    }

    const onSave = (e) => {
        e.preventDefault();
        if (validateFullProduct()) {
            saveProduct();
        } else {
            setFieldError({
                ...fieldErrors,
                name: productValidators.validateProductName(product.name),
                price: productValidators.validatePrice(product.price)
            });
        }
    }

    return (
        <div className='create-product'>
            <form className='form' method="post" action="#" id="#">
                <FormGroup
                    name='name'
                    labelValue='Producto'
                    inputType='text'
                    onChange={onInputChange}
                    errors={fieldErrors['name']}
                    placeholder={'Enter a product name'}
                />
                <FormGroup
                    name='price'
                    labelValue='Precio'
                    inputType='number'
                    onChange={onInputChange}
                    errors={fieldErrors['price']}
                    placeholder={'0.00'}
                />
                <div className='form__options'>
                    <Button onClick={onSave}>Save</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct