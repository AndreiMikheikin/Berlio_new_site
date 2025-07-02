import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { renderToString } from 'react-dom/server';
import BerlioLocationIcon from '../SVGIcons/BerlioLocationIcon';
import useLocalization from '../../hooks/useLocalization';

const YandexMap = ({ coordinates = [53.876159, 27.547862] }) => {
    const { locale } = useLocalization(); // Получаем текущий язык

    // Определяем язык для Yandex Maps
    const yandexLang = locale === 'ru' ? 'ru_RU' : 'en_US';

    // Используем ключ для перерендера карты
    const [mapKey, setMapKey] = useState(Date.now()); // Состояние для ключа

    useEffect(() => {
        setMapKey(Date.now()); // Обновляем ключ, чтобы перерисовать карту
    }, [coordinates]); // Следим за изменением координат

    const [iconSvg, setIconSvg] = useState('');

    useEffect(() => {
        const svgString = renderToString(<BerlioLocationIcon />);
        if (svgString) {
            setIconSvg(svgString);
        }
    }, []);

    return (
        <YMaps query={{ lang: yandexLang, load: 'Map,Placemark,geolocation' }}>
            <Map
                key={mapKey} // Применяем ключ для перерендера карты
                state={{ center: coordinates, zoom: 17 }} // Используем state для динамических изменений
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
