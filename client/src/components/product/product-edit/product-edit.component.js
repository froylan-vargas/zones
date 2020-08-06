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
                    name='description'
                    labelValue='Descripción'
                    inputType='text'
                    defaultValue={product.description}
                    onChange={onInputChange}
                    errors={fieldErrors['description']}
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
                    name='priority'
                    labelValue='Prioridad'
                    inputType='number'
                    defaultValue={product.priority}
                    onChange={onInputChange}
                    errors={fieldErrors['priority']}
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