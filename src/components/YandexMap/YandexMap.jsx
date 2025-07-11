import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';

import BerlioLocationIcon from '../SVGIcons/BerlioLocationIcon';
import useLocalization from '../../hooks/useLocalization';

function YandexMap({ coordinates = [53.876159, 27.547862] }) {
  const { locale } = useLocalization();
  const yandexLang = locale === 'ru' ? 'ru_RU' : 'en_US';
  const [iconSvg, setIconSvg] = useState('');
  const [ymapsModules, setYmappsModules] = useState(null);

  useEffect(() => {
    // Загружаем SVG один раз
    const svg = renderToStaticMarkup(<BerlioLocationIcon />);
    setIconSvg(svg);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Динамически импортируем модуль карты только на клиенте
    import('@pbe/react-yandex-maps').then((ymaps) => {
      setYmappsModules(ymaps);
    });
  }, []);

  if (typeof window === 'undefined' || !ymapsModules) {
    return null; // SSR или ещё не загрузили карту
  }

  const { YMaps, Map, Placemark } = ymapsModules;

  const safeCoordinates =
    Array.isArray(coordinates) && coordinates.length === 2
      ? coordinates
      : [53.876159, 27.547862];

  return (
    <YMaps
      query={{
        lang: yandexLang,
        load: 'Map,Placemark,geolocation',
        apikey: 'a698c67a-40ac-42e6-b56f-d4891be7b968',
      }}
      key={`ymaps_${locale}`}
    >
      <Map
        key={`${locale}_${safeCoordinates.join(',')}`}
        state={{ center: safeCoordinates, zoom: 17 }}
        width="100%"
        height="700px"
      >
        {iconSvg && (
          <Placemark
            geometry={safeCoordinates}
            options={{
              iconLayout: 'default#image',
              iconImageHref: `data:image/svg+xml;utf8,${encodeURIComponent(iconSvg)}`,
              iconImageSize: [80, 80],
              iconImageOffset: [-25, -75],
            }}
            properties={{
              iconContent: 'Моя метка',
              hintContent: 'Описание объекта',
            }}
          />
        )}
      </Map>
    </YMaps>
  );
}

YandexMap.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number),
};

export default YandexMap;
