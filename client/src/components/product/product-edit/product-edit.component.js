import React from 'react';

import Button from '../../elements/button/button.component'
import FormGroup from '../../elements/form-group/form-group.component'

const ProductEdit = ({ product, onSave, onInputChange, fieldErrors }) => {

    return (
        <div className='product-edit'>
            <form className='form' method="post" action="#" id="#">
                <FormGroup
                    name='name'
                    labelValue='Producto'
                    inputType='text'
                    defaultValue={product.name}
                    onChange={onInputChange}
                    errors={fieldErrors['name']}
                />
                <FormGroup
                    name='price'
                    labelValue='Precio'
                    inputType='number'
                    defaultValue={product.price}
                    onChange={onInputChange}
                    errors={fieldErrors['price']}
                />
                <FormGroup
                    name='isactive'
                    labelValue='Estatus'
                    inputType='checkbox'
                    defaultValue={product.isactive}
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