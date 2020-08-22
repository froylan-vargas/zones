import React from 'react'

import Button from '../elements/button/button.component'

const Promotion = () => {
    return (
        <div className="promotion">
            <div className="promotion--left">
                <span className="promotion__description u-margin-bottom-short">
                    ¡Nuevo Producto! Descuento 20%
                    </span>
                <div className="promotion__options">
                    <Button modifier={'white'}>
                        Ver mas &rarr;
                    </Button>
                    <Button modifier={'white'}>
                        <span>Agregar <i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
                    </Button>
                </div>
            </div>
            <div className="promotion--right">
                {/* <img className="promotion__image" src="https://zones-images.s3.us-east-2.amazonaws.com/promo-flower.png" alt="promotion product" /> */}
            </div>
        </div>
    )
}

export default Promotion