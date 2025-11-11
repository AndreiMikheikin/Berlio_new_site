import React from "react";
import Structure from '/assets/images/azs-automation-system.png';
import '../../../../styles/components/ComplexComponents/Presentations/Slide2.scss';

const PPPSASlide2 = () => {
    return (
        <section className="aam_slide2-section">
            <h2 className="aam_slide2-section--header">Назначение и структура</h2>
            <img src={Structure} alt="Структура системы автоматизации АЗС" />
            <div className="aam_slide2-section--container">
                <div className="aam_slide2-section--container-wrapper">
                    <p><strong>Пакет прикладных программ «Система автоматизации АЗС»</strong> - новый проект НП ООО «БЕРЛИО»,
                        предназначенный для решения задач по управлению сетью АЗС на различных уровнях. Программное обеспечение
                        реализовано в виде многоуровневой системы, позволяющей организовывать удалённое управление АЗС из офиса
                        компании, мониторинг процессов на АЗС, передачу и получение данных в реальном времени, распределение задач
                        и актуализацию информации на АЗС, автоматизацию рабочих мест менеджеров на АЗС и многое другое.
                    </p>
                </div>
            </div>
            <div className="aam_slide2-section--container">
                <div className="aam_slide2-section--container-wrapper">
                    <div>
                        <p><strong>Уровень «Управление»</strong></p>
                        <p><strong>Программное обеспечение «Офис».</strong></p>
                        <p><strong>Роли:</strong> управление, менеджеры.</p>
                        <p><strong>Цель:</strong> управление всеми АЗС сети.</p>
                    </div>

                    <div className="aam_slide2-section--container-wrapper-list">
                        <p>Решаемые задачи:</p>
                        <ul>
                            <li>- управление списком АЗС;</li>
                            <li>- управление списком операторов для АЗС;</li>
                            <li>- управление НП и услугами на АЗС;</li>
                            <li>- управление видами оплаты на АЗС;</li>
                            <li>- управление курсами валют;</li>
                            <li>- управление ценами на АЗС;</li>
                            <li>- управление видео рекламой на АЗС;</li>
                            <li>- управление акциями на АЗС;</li>
                            <li>- отображение информации с АЗС по резервуарам;</li>
                            <li>- отображение информации с АЗС по остаткам товаров;</li>
                            <li>- отображение информации по программной кассе.</li>
                        </ul>
                    </div>
                </div>
                <div className="aam_slide2-section--container-wrapper">
                    <div>
                        <p><strong>Уровень «Обслуживание»</strong></p>
                        <p><strong>Программное обеспечение «ЦТО».</strong></p>
                        <p><strong>Роли:</strong> центр технического обслуживания,<br /> специалист по IT.</p>
                        <p><strong>Цель:</strong> обслуживание всех АЗС сети.</p>
                    </div>

                    <div className="aam_slide2-section--container-wrapper-list">
                        <p>Решаемые задачи:</p>
                        <ul>
                            <li>- хранение конфигураций;</li>
                            <li>- хранение инсталляций, обновление базы данных;</li>
                            <li>- удаленное обновление ПО;</li>
                            <li>- справочная информация по настройкам;</li>
                            <li>- диагностика сервисов и служб;</li>
                            <li>- создание и сохранение копий базы данных;</li>
                            <li>- сообщения от операторов АЗС.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section >

    )
}

export default PPPSASlide2;