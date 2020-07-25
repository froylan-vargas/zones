import React, { Component } from 'react'
import axios from 'axios'

import Button from '../button/button.component'

class ProductEdit extends Component {

    state = {
        id: null,
        name: '',
        price: '',
        isactive: false
    }

    componentDidMount() {
        const { id, name, price, isactive } = this.props.product;
        this.setState({
            id,
            name,
            price,
            isactive
        })
    }

    onInputChange = (event) => {
        if (event.target.name === 'isactive') {
            this.setState({
                isactive: event.target.checked
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    onSave = (product) => {

    }

    render() {
        const { product } = this.props;
        return (
            <div className='product-edit'>
                <form method="post" action="#" id="#">
                    <div className='form__group'>
                        <label className='form__label' htmlFor='name'>Nombre:</label>
                        <input
                            type='text'
                            required
                            className='form__input'
                            name='name'
                            id='name'
                            defaultValue={this.state.name}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='price'>Precio:</label>
                        <input
                            type='text'
                            required
                            className='form__input'
                            name='price'
                            id='price'
                            defaultValue={this.state.price}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className='form__group'>
                        <label className='form__label' htmlFor='price'>Precio:</label>
                        <input
                            type='checkbox'
                            required
                            className='form__checkbox'
                            name='isactive'
                            id='isactive'
                            checked={this.state.isactive}
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className='admin-product__options'>
                        <Button>Save</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductEdit