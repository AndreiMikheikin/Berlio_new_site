import React from 'react';
import ServiceCard from '../../ServiceCard/ServiceCard';
import OilIcon from '../../SVGIcons/OilIcon';
import PaymentCardIcon from '../../SVGIcons/PaymentCardIcon';
import MapIcon from '../../SVGIcons/MapIcon';
import LinkTo from '../../LinkTo/LinkTo';
import '../../../styles/components/ComplexComponents/MainBlock.scss';
import SparklingLights from '../../SparklingLights/SparklingLights';

import { useTranslation } from 'react-i18next';

const MainBlock = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_main-block">
            <header className="aam_main-block__header">
                <h1>{t('mainBlock.companyName')}</h1>
                <SparklingLights />
            </header>

            <section className="aam_main-block__services">
                <ServiceCard
                    Icon={OilIcon}
                    title={t('mainBlock.headline')}
                    description={t('mainBlock.tagline')}
                    link="/clients/signAndResign"
                />
                <ServiceCard
                    Icon={PaymentCardIcon}
                    title={t('mainBlock.fuelCardUsage')}
                    description={t('mainBlock.belTollServices')}
                    link="https://www.berlio.by/clients/pravila-platezhnoy-sistemy-berlio/Выпуск%20в%20обращение%20и%20использование%20топливных%20карт.pdf"
                />
                <ServiceCard
                    Icon={MapIcon}
                    title={t('mainBlock.nonResidentServices')}
                    description={t('mainBlock.nonResidentSupport')}
                />
            </section>

            <footer className="aam_main-block__footer">
                <LinkTo href="/about" text={t('mainBlock.readMore')} />
            </footer>
        </main>
    );
};

export default MainBlock;