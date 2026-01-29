import React from "react";
import Pistols from '/assets/images/on-pistols.png';
import PumpMan from '/assets/images/pump-car.png';
import PumpWoman from '/assets/images/wom-pump.png';
import '../../../../styles/components/ComplexComponents/Presentations/Slide5.scss';

const PPPSASlide11 = () => {
    return (
        <section className="aam_slide5-section">
            <img id="pis" src={Pistols} alt="Пистолеты на колонке" />
            <img id="man" src={PumpMan} alt="Мужчина заправляет авто" />
            <img id="wom" src={PumpWoman} alt="Женщина заправляет авто" />
            <h2 className="aam_slide5-section--header">Назначение и функциональные возможности</h2>
            <div className="aam_slide5-section--container">
                <div className="aam_slide5-section--container-wrapper">
                    <p>Новое мобильное приложение для физических лиц (B2C) для бесконтактной
                        оплаты топлива и товаров через мобильное приложение в сети по банковской
                        карте.
                    </p>
                    <h3>Решает следующие задачи:</h3>
                    <ul>
                        <li>привязка банковской карты;</li>
                        <li>оплата топлива;</li>
                        <li>формирование и оплата предзаказа товаров и горячих напитков;</li>
                        <li>работа с программой лояльности и участие в акциях.</li>
                    </ul>
                </div>
            </div>
        </section >
    )
}

export default PPPSASlide11;