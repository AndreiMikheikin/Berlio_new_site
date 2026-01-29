import React from "react";
import Scheme from '/assets/images/scheme.png';
import Pistols from '/assets/images/on-pistols.png';
import PumpMan from '/assets/images/pump-car.png';
import PumpWoman from '/assets/images/wom-pump.png';
import '../../../../styles/components/ComplexComponents/Presentations/Slide4.scss';

const PPPSASlide4 = () => {
    return (
        <section className="aam_slide4-section">
            <img id="pis" src={Pistols} alt="Пистолеты на колонке" />
            <img id="man" src={PumpMan} alt="Мужчина заправляет авто" />
            <img id="wom" src={PumpWoman} alt="Женщина заправляет авто" />
            <h2 className="aam_slide4-section--header">Общая схема работы ППП «Система автоматизации АЗС»</h2>
            <div className="aam_slide4-section--container">
                <div className="aam_slide4-section--container-wrapper">
                    <img src={Scheme} alt="Структура системы автоматизации АЗС" />
                </div>
            </div>
        </section >

    )
}

export default PPPSASlide4;