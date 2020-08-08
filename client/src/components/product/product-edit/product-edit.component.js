import React from 'react';

import Button from '../../elements/button/button.component';
import FormGroup from '../../elements/form-group/form-group.component';
import TextArea from '../../elements/text-area/text-area.comoponent';
import FormSwitch from '../../elements/form-switch/form-switch.component';

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
                <TextArea
                    name='description'
                    labelValue='Descripción'
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
                <FormSwitch
                    label='Estatus'
                    onChange={onInputChange}
                    checked={product.isactive}
                />

                <div className='form__options'>
                    <Button modifier="white" onClick={onSave}>Guardar</Button>
                </div>
            </form>
        </div>
    )
}

export default ProductEdit