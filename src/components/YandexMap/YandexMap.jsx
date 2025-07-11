import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';

import BerlioLocationIcon from '../SVGIcons/BerlioLocationIcon';
import useLocalization from '../../hooks/useLocalization';

function YandexMap({ coordinates = [53.876159, 27.547862] }) {
  const { locale } = useLocalization();
  const yandexLang = locale === 'ru' ? 'ru_RU' : 'en_US';

  const [iconSvg, setIconSvg] = useState('');
  const [ymapsModules, setYmappsModules] = useState(null);

  const mapRef = useRef(null);
  const placemarkRef = useRef(null);

  useEffect(() => {
    const svg = renderToStaticMarkup(<BerlioLocationIcon />);
    setIconSvg(svg);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('@pbe/react-yandex-maps').then((ymaps) => {
      setYmappsModules(ymaps);
    });
  }, []);

  useEffect(() => {
    if (mapRef.current && placemarkRef.current && coordinates) {
      mapRef.current.setCenter(coordinates, 17);
      placemarkRef.current.geometry.setCoordinates(coordinates);
    }
  }, [coordinates]);

  if (typeof window === 'undefined' || !ymapsModules) {
    return null;
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
    >
      <Map
        defaultState={{ center: safeCoordinates, zoom: 17 }}
        width="100%"
        height="700px"
        instanceRef={(ref) => {
          if (ref) mapRef.current = ref;
        }}
      >
        {iconSvg && (
          <Placemark
            defaultGeometry={safeCoordinates}
            instanceRef={(ref) => {
              if (ref) placemarkRef.current = ref;
            }}
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
