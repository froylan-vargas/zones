import React from 'react'

import Logo from '../../logo/logo.component'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__box">
                <div className="footer__box--left">
                    {/* <a href="#" className="external-link">Preguntas Frecuentes &rarr;</a><br />
                    <a href="#" className="external-link">Entregas Y Devoluciones &rarr;</a><br />
                    <a href="#" className="external-link">Terminos del Servicio &rarr;</a><br />
                    <a href="#" className="external-link external-link--social"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="#" className="external-link external-link--social"><i className="fa fa-instagram" aria-hidden="true"></i></a> */}
                </div>
                <div className="footer__box--right">
                    <Logo />
                    <br />
                    <br />
                    <span className="footer__copyright">
                        &copy; 2020, Zones
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer