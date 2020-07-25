import React from 'react'

import Button from '../../elements/button/button.component'

const Product = () => {
    return (
        <div className="product">
            <div className="product__top">
                <img className="product__image" src="https://uy.emedemujer.com/wp-content/uploads/sites/4/2019/07/flor-de-lis-770x504.jpg" alt="product" />
            </div>
            <div className="product__bottom">
                    <span className="product__price">$200.00</span>
                    <Button modifier={'white'}>
                        <span>Agregar <i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </Button>
                
            </div>
        </div>
    )
}

export default Product