import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import axios from 'axios';

import { setEditOptions, fetchProductsStart } from '../../../redux/product/product.actions';
import { setResultNotification } from '../../../redux/notification/notification.actions';
import productValidators from '../../../utils/validators/product-validators.utils';
import { selectSelectedCategory } from '../../../redux/category/category.selectors';
import { setSelectedCategory } from '../../../redux/category/category.actions';

import EditProduct from '../product-edit/product-edit.component'
import CreateProduct from '../product-create/product-create.component'


const ProductModify = ({ editOptions, setEditOptions, fetchProductsStart, setResultNotification, selectedCategory, setSelectedCategory }) => {

    const { product, method } = editOptions;

    const [formProduct, setProductProperties] = useState({
        id: product.id,
        categoryid: product.categoryid,
        name: product.name,
        price: product.price,
        isactive: product.isactive
    });

    const [fieldErrors, setFieldError] = useState({
        name: [],
        price: [],
        isactive: [],
        categoryid: []
    })

    const onInputChange = (event) => {
        if (event.target.name === 'isactive') {
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
            default:
                break;
        }
    }

    const validateFullProduct = () => {
        const nameErrors = productValidators.validateProductName(product.name);
        const priceErrors = productValidators.validatePrice(product.price);
        const categoryErrors = productValidators.validateCategory(product.categoryid);
        return !nameErrors.length && !priceErrors.length && !categoryErrors.length;
    }

    const saveProduct = async () => {

        const categoryid = method === 'create' ? selectedCategory : formProduct.categoryid

        const body = {
            id: formProduct.id,
            categoryid,
            isactive: formProduct.isactive,
            name: formProduct.name,
            price: formProduct.price
        }

        let result;

        method === 'create' ? result = await axios.post('/api/product/create', body)
            : result = await axios.put('/api/product/update', body)

        let notification;

        if (result.data.error) {
            notification = {
                visible: true,
                isError: true,
                message: result.data.error
            }
        } else {
            notification = {
                visible: true,
                isError: false,
                message: 'El producto se ha guardado correctamente'
            }
            fetchProductsStart();
            setEditOptions({ setShowEditWindow: false });
            setSelectedCategory("0");
        }
        setResultNotification(notification);
    }

    const onSave = (e) => {
        e.preventDefault();
        if (validateFullProduct()) saveProduct();
        else {
            setFieldError({
                ...fieldErrors,
                name: productValidators.validateProductName(product.name),
                price: productValidators.validatePrice(product.price),
                categoryid: productValidators.validateCategory(product.categoryid)
            });
        }
    }

    return (
        method === 'create'
            ? <CreateProduct onInputChange={onInputChange} onSave={onSave} product={formProduct} fieldErrors={fieldErrors} />
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