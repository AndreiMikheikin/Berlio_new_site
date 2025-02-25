import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/components/ComplexComponents/EquipmentAndSoftMain.scss";

import { useTranslation } from "react-i18next";

const EquipmentAndSoftMain = () => {
    const { t } = useTranslation();

    return (
        <main className="aam_equipment-and-soft-main">
            {/* Breadcrumbs */}
            <div className="aam_equipment-and-soft-main__breadcrumbs">
                <Link to="/">{t('breadCrumbs.home')}</Link> /{' '}
                {t('breadCrumbs.equipment')}
            </div>

            {/* Title */}
            <h1 className="aam_equipment-and-soft-main__header">{t('equipment.name')}</h1>

            {/* Description */}
            <div className="aam_equipment-and-soft-main__description">
                <p>{t('equipment.descr1')}</p>
                <p>{t('equipment.descr2')}</p>
            </div>
        </main>
    );
};

export default EquipmentAndSoftMain;