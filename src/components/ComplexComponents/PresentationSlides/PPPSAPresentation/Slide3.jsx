import React from "react";
import '../../../../styles/components/ComplexComponents/Presentations/Slide3.scss';

const PPPSASlide3 = () => {
    return (
        <section className="aam_slide3-section">
            <h2 className="aam_slide3-section--header">Назначение и структура</h2>
            <div className="aam_slide3-section--container">
                <div className="aam_slide3-section--container-wrapper">
                    <div>
                        <p><strong>Уровень «АЗС»</strong></p>
                        <p><strong>Программное обеспечение «Менеджер».</strong></p>
                        <p><strong>Роли:</strong> начальник, таваровед АЗС.</p>
                        <p><strong>Цель:</strong> управление АЗС.</p>
                    </div>

                    <div className="aam_slide3-section--container-wrapper-list">
                        <p>Решаемые задачи:</p>
                        <ul>
                            <li>- прием товарных накладных;</li>
                            <li>- прием топлива;</li>
                            <li>- проведение инвентаризации товаров;</li>
                            <li>- корректировка счетчиков ТРК;</li>
                            <li>- корректировка остатков топлива;</li>
                            <li>- корректировка параметров резервуаров;</li>
                            <li>- перевод резервуаров на сезонные виды топлива;</li>
                            <li>- формирование отчетов.</li>
                        </ul>
                    </div>
                </div>
                <div className="aam_slide3-section--container-wrapper">
                    <div>
                        <p><strong>Уровень «АЗС»</strong></p>
                        <p><strong>Программное обеспечение «Оператор».</strong></p>
                        <p><strong>Роли:</strong> оператор АЗС.</p>
                        <p><strong>Цель:</strong> автоматизация рабочего места оператора.</p>
                    </div>

                    <div className="aam_slide3-section--container-wrapper-list">
                        <p>Решаемые задачи:</p>
                        <ul>
                            <li>- отпуск нефтепродуктов, товаров и услуг;</li>
                            <li>- отображение данных о кассовом оборудовании;</li>
                            <li>- отображение данных с резервуаров;</li>
                            <li>- закрытие/открытие смен;</li>
                            <li>- управление сменами;</li>
                            <li>- формирование отчетов;</li>
                            <li>- ведение учета наличных и безналичных средств.</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="aam_slide3-section--container">
                <div className="aam_slide3-section--container-wrapper">
                    <div>
                        <p><strong>Уровень «Инфраструктура»</strong></p>
                        <p><strong>Цель:</strong> поддержка развитой инфраструктуры АЗС.</p>
                    </div>

                    <div className="aam_slide3-section--container-wrapper-list">
                        <p>Решаемые задачи:</p>
                        <ul>
                            <li>- реализация самообслуживания на АЗС;</li>
                            <li>- обеспечение бесконтактной оплаты;</li>
                            <li>- вывод информации о работе АЗС (отпуск топлива, готовность заказов, реклама);</li>
                            <li>- управление стелой с ценами на топливо;</li>
                            <li>- контроль за работой оборудования на АЗС;</li>
                            <li>- прием и обработка электронных накладных с нефтебаз.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section >

    )
}

export default PPPSASlide3;