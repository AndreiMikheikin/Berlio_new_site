import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { renderToString } from 'react-dom/server';
import BerlioLocationIcon from '../SVGIcons/BerlioLocationIcon';
import useLocalization from '../../hooks/useLocalization';

const YandexMap = ({ coordinates = [53.876159, 27.547862] }) => {
    const { locale } = useLocalization();
    const yandexLang = locale === 'ru' ? 'ru_RU' : 'en_US';

    // Ключ для принудительного ререндера карты при смене языка или координат
    const [mapKey, setMapKey] = useState(`${locale}_${coordinates.join(',')}`);

    const [iconSvg, setIconSvg] = useState('');

    useEffect(() => {
        const svgString = renderToString(<BerlioLocationIcon />);
        if (svgString) {
            setIconSvg(svgString);
        }
    }, []);

    // Обновляем ключ при изменении языка или координат
    useEffect(() => {
        setMapKey(`${locale}_${coordinates.join(',')}`);
    }, [locale, coordinates]);

    return (
        <YMaps 
            query={{ 
                lang: yandexLang, 
                load: 'Map,Placemark,geolocation' 
            }}
            key={`ymaps_${locale}`}  // Принудительно пересоздаем YMaps при смене языка
        >
            <Map
                key={mapKey}  // Принудительно пересоздаем Map при смене языка или координат
                state={{ center: coordinates, zoom: 17 }}
                width="100%"
                height="700px"
            >
                <Placemark
                    geometry={coordinates}
                    options={{
                        iconLayout: 'default#image',
                        iconImageHref: `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`,
                        iconImageSize: [80, 80],
                        iconImageOffset: [-25, -75]
                    }}
                    properties={{
                        iconContent: 'Моя метка',
                        hintContent: 'Описание объекта'
                    }}
                />
            </Map>
        </YMaps>
    );
};

export default YandexMap;