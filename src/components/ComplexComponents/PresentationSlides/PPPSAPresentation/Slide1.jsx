import React from "react";
import QR from "../../../../assets/qr/qr.png";
import BuyersDisplay from "/assets/images/buyers-display.png";
import '../../../../styles/components/ComplexComponents/Presentations/Slide1.scss';

const PPPSASlide1 = () => {
    return(
        <section className="aam_slide-section">
            <div className="aam_slide-section--container">
                <div className="aam_slide-section--container-wrapper">
                    <h1  className="aam_slide-section--container-wrapper-header">НП ООО "БЕРЛИО"</h1>
                    <p className="aam_slide-section--container-wrapper-text">Разработка и проектирование программного обеспечения</p>
                </div>
                <div className="aam_slide-section--container-wrapper">
                    <h2 className="aam_slide-section--container-wrapper-header">РЕКВИЗИТЫ:</h2>
                    <p className="aam_slide-section--container-wrapper-text">220007, Беларусь,</p>
                    <p className="aam_slide-section--container-wrapper-text">г. Минск, ул. Быховская, 55,</p>
                    <p className="aam_slide-section--container-wrapper-text">телефон: <a href="tel:+375173691494">+375 (17) 369-14-94</a></p>
                    <p className="aam_slide-section--container-wrapper-text">E-mail: <a href="mailto:berlio@berlio.by">berlio@berlio.by</a></p>
                </div>
            </div>
            <div  className="aam_slide-section--container">
                <img id="QR" src={QR} alt="QR code" />
                <img id="BD" src={BuyersDisplay} alt="Buyers display" />
            </div>
        </section>
        
    )
}

export default PPPSASlide1;