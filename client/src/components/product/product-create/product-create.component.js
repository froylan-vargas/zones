import React from 'react';

import FormGroup from '../../elements/form-group/form-group.component';
import Button from '../../elements/button/button.component';
import CategoriesSelectContainer from '../../categories-select-container/categories-select-container.component'

const CreateProduct = ({ onSave, onInputChange, fieldErrors }) => {
    return (
        <div className='create-product'>
            <form className='form' method="post" action="#">
                <CategoriesSelectContainer errors={fieldErrors['categoryid']} />
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

export default CreateProduct;