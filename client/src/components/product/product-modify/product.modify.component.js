import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchProductsStart } from '../../../redux/product/product.actions';
import productValidators from '../../../utils/validators/product-validators.utils';
import { selectSelectedCategory } from '../../../redux/category/category.selectors';

import EditProduct from '../product-edit/product-edit.component';
import CreateProduct from '../product-create/product-create.component';
import AdminUseRequest from '../../admin/admin-use-request.component';


const ProductModify = ({ editOptions, fetchProductsStart, selectedCategory }) => {

    const { product, method } = editOptions;

    const [formProduct, setProductProperties] = useState({
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        description: product.description,
        price: product.price,
        priority: product.priority,
        isActive: product.isActive
    });

    const [fieldErrors, setFieldError] = useState({
        name: [],
        description: [],
        price: [],
        priority: [],
        isActive: [],
        optionId: []
    })

    const {doRequest}  = AdminUseRequest({
        url: method === 'create' ? '/api/product' : `/api/product/${product.id}`,
        method: method === 'create' ? 'post' : 'put',
        successMessage: 'El producto se guardo exitosamente',
        body: {
            id: formProduct.id,
            categoryId: method === 'create' ? selectedCategory : formProduct.categoryId,
            isActive: formProduct.isActive,
            name: formProduct.name,
            price: formProduct.price,
            description: formProduct.description,
            priority: formProduct.priority
        },
        onSuccess: () => fetchProductsStart()
    })

    const onInputChange = (event) => {
        if (event.target.name === 'isChecked') {
            setProductProperties({ ...formProduct, isActive: event.target.checked })
        } else {
            const { name, value } = event.target
            setProductProperties({ ...formProduct, [name]: value });
            validateInput(name, value);
        }
    }

    const validateInput = (name, value) => {
        switch (name) {
            case 'name':
                return setFieldError({ ...fieldErrors, [name]: productValidators.validateProductName(value) });
            case 'price':
                return setFieldError({ ...fieldErrors, [name]: productValidators.validatePrice(value) });
            case 'description':
                return setFieldError({ ...fieldErrors, [name]: productValidators.validateDescription(value) });
            case 'priority':
                return setFieldError({ ...fieldErrors, [name]: productValidators.validatePriority(value) });
            default:
                break;
        }
    }

    const validateFullProduct = () => {
        const categoryId = method === 'create' ? selectedCategory : formProduct.categoryId
        const nameErrors = productValidators.validateProductName(formProduct.name);
        const priceErrors = productValidators.validatePrice(formProduct.price);
        const categoryErrors = productValidators.validateCategory(categoryId);
        const descriptionErrors = productValidators.validateDescription(formProduct.description);
        const priorityErrors = productValidators.validatePriority(formProduct.priority);
        return !nameErrors.length && !priceErrors.length && !categoryErrors.length && !descriptionErrors.length && !priorityErrors.length;
    }

    const onSave = (e) => {
        e.preventDefault();
        if (validateFullProduct()) doRequest();
        else {
            setFieldError({
                ...fieldErrors,
                name: productValidators.validateProductName(formProduct.name),
                price: productValidators.validatePrice(formProduct.price),
                optionId: productValidators.validateCategory(selectedCategory),
                description: productValidators.validateDescription(formProduct.description),
                priority: productValidators.validatePriority(formProduct.priority)
            });
        }
    }

    return (
        method === 'create'
            ? <CreateProduct onInputChange={onInputChange} onSave={onSave} product={formProduct} fieldErrors={fieldErrors} setFieldError={setFieldError} />
            : <EditProduct onInputChange={onInputChange} onSave={onSave} product={formProduct} fieldErrors={fieldErrors} />
    )
}

const mapDispatchToProps = dispatch => ({    
    fetchProductsStart: () => dispatch(fetchProductsStart())
})

const mapStateToProps = createStructuredSelector({
    selectedCategory: selectSelectedCategory
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductModify);