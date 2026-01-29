import React from "react";
import '../../../../styles/components/ComplexComponents/Presentations/Slide5.scss';

const PPPSASlide13 = () => {
    return (
        <section className="aam_slide5-section">
            <h2 className="aam_slide5-section--header">Назначение и функциональные возможности</h2>
            <div className="aam_slide5-section--container">
                <div className="aam_slide5-section--container-wrapper">
                    <p>
                        Программное обеспечение <strong>«API Berlio Info»</strong>
                        представляет собой программный интерфейс, работающий в «Online»
                        режиме и позволяющий по запросу пользователя получать информацию
                        о состоянии договора (электронных картах) и всех проведенных платежах.
                    </p>
                    <p>
                        «API Berlio Info» доступен всем пользователям, заключившим договор
                        на обслуживание в системе электронных денег «Берлио».
                    </p>
                    <h3>Решаемые задачи:</h3>
                    <ul>
                        <li>получение списка клиентов;</li>
                        <li>получение информации о клиенте;</li>
                        <li>получение списка карт на договоре;</li>
                        <li>получение данных о балансе и оборотах за произвольный месяц/период;</li>
                        <li>формирование списка реализаций и платежей клиента;</li>
                        <li>формирование и выгрузка данных в различные учетные системы в форматах (XML, JSON);</li>
                        <li>получение сведений в режиме «Online» и  «24/7» и т.д.</li>
                    </ul>
                </div>
            </div>
        </section >
    )
}

export default PPPSASlide13;