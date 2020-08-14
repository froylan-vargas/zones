import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import axios from 'axios';

import { setEditOptions, fetchProductsStart } from '../../../redux/product/product.actions';
import { setResultNotification } from '../../../redux/notification/notification.actions';
import productValidators from '../../../utils/validators/product-validators.utils';
import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import { setSelectedCategory } from '../../../redux/category/category.actions';
import notificationUtils from '../../../utils/notification.utils';

import EditProduct from '../product-edit/product-edit.component'
import CreateProduct from '../product-create/product-create.component'


const ProductModify = ({ editOptions, setEditOptions, fetchProductsStart, setResultNotification, selectedCategory, setSelectedCategory }) => {

    const { product, method } = editOptions;

    const [formProduct, setProductProperties] = useState({
        id: product.id,
        categoryid: product.categoryid,
        name: product.name,
        description: product.description,
        price: product.price,
        priority: product.priority,
        isactive: product.isactive
    });

    const [fieldErrors, setFieldError] = useState({
        name: [],
        description: [],
        price: [],
        priority: [],
        isactive: [],
        optionId: []
    })

    const onInputChange = (event) => {
        if (event.target.name === 'isChecked') {
            setProductProperties({ ...formProduct, isactive: event.target.checked })
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
        const categoryid = method === 'create' ? selectedCategory : formProduct.categoryid
        const nameErrors = productValidators.validateProductName(formProduct.name);
        const priceErrors = productValidators.validatePrice(formProduct.price);
        const categoryErrors = productValidators.validateCategory(categoryid);
        const descriptionErrors = productValidators.validateDescription(formProduct.description);
        const priorityErrors = productValidators.validatePriority(formProduct.priority);
        return !nameErrors.length && !priceErrors.length && !categoryErrors.length && !descriptionErrors.length && !priorityErrors.length;
    }

    const saveProduct = async () => {

        const categoryid = method === 'create' ? selectedCategory : formProduct.categoryid

        const body = {
            id: formProduct.id,
            categoryid,
            isactive: formProduct.isactive,
            name: formProduct.name,
            price: formProduct.price,
            description: formProduct.description,
            priority: formProduct.priority
        }

        let result;

        method === 'create' ? result = await axios.post('/api/product/create', body)
            : result = await axios.put('/api/product/update', body)


        if (!result.data.error) {
            fetchProductsStart();
        }
        setEditOptions({ setShowEditWindow: false });
        setSelectedCategory("0");
        setResultNotification(notificationUtils.createNotification(result, 'El producto se guardo exitosamente'));
    }

    const onSave = (e) => {
        e.preventDefault();
        if (validateFullProduct()) saveProduct();
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
    setEditOptions: editOptions => dispatch(setEditOptions(editOptions)),
    fetchProductsStart: () => dispatch(fetchProductsStart()),
    setResultNotification: notification => dispatch(setResultNotification(notification)),
    setSelectedCategory: selectedCategory => dispatch(setSelectedCategory(selectedCategory))
})

const mapStateToProps = createStructuredSelector({
    selectedCategory: selectSelectedCategory
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductModify);