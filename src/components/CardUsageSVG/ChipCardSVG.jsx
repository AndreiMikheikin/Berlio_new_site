import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

function ChipCardSVG({ onCardRead }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const cardRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    targetRef.current = document.getElementById('bv');
    document.documentElement.style.touchAction = 'none';

    return () => {
      document.documentElement.style.touchAction = 'auto';
    };
  }, []);

  const checkOverlap = (chipRect, targetRect) => !(
    chipRect.right < targetRect.left
            || chipRect.left > targetRect.right
            || chipRect.bottom < targetRect.top
            || chipRect.top > targetRect.bottom
  );

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });

    const chipElement = cardRef.current;
    const targetElement = targetRef.current;

    if (!chipElement || !targetElement) return;

    const chipRect = chipElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    if (checkOverlap(chipRect, targetRect)) {
      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          setPosition(startPosition.current);
          timerRef.current = null;
          onCardRead();
        }, 1000);
      }
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStop = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  return (
    <Draggable nodeRef={cardRef} position={position} onDrag={handleDrag} onStop={handleStop}>
      <svg
        ref={cardRef}
        id="e"
        width="129"
        height="48"
        viewBox="0 0 11.377 4.2333"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Draggable Chip Card"
        style={{ cursor: 'grab' }}
      >
        <defs id="f">
          <filter id="d52" x="-.0078181" y="-.0258" width="1.0156" height="1.0516" colorInterpolationFilters="sRGB">
            <feGaussianBlur id="g" stdDeviation="0.033858607" />
          </filter>
          <linearGradient id="a52" x1=".23246" x2="10.968" y1="2.3174" y2="2.3174" gradientTransform="translate(.052156 -.22777)" gradientUnits="userSpaceOnUse">
            <stop id="i" stopColor="#b4b4b4" offset="0" />
            <stop id="h" stopColor="#5e5e5e" offset="1" />
          </linearGradient>
          <radialGradient id="j52" cx="8.4485" cy=".71294" r="1.4332" gradientTransform="matrix(1.0271 0 0 .60307 -.21155 .75263)" gradientUnits="userSpaceOnUse">
            <stop id="l" stopColor="#989898" offset="0" />
            <stop id="m" stopColor="#a2a2a2" offset="1" />
          </radialGradient>
        </defs>
        <path id="k" transform="matrix(1.0331 0 0 1.0487 -.32416 -.31877)" d="m3.3259 0.78318c-0.052773 7.086e-4 -0.10373 0.019505-0.14451 0.053298l-2.2947 1.9025c-0.07404 0.061396-0.18422 0.17416-0.21462 0.26544-0.044698 0.13422-0.019633 0.26451 0.08065 0.39062 0.057778 0.072651 0.172 0.17223 0.24379 0.23102 0.1806 0.14793 0.33014 0.20973 0.47136 0.24846 0.080924 0.022205 0.21579 0.034632 0.29966 0.033879l7.955-0.071316c0.10804-9.538e-4 0.21211-0.041242 0.29303-0.11342l0.99538-0.88768c0.02968-0.026478 0.04105-0.068131 0.02899-0.10619l-0.54018-1.7041c-0.01372-0.043302-0.04047-0.11223-0.068-0.14815-0.04016-0.052355-0.09552-0.094836-0.17976-0.11871-0.2493 0.00497-6.8121 0.025549-6.926 0.024302zm-1.6012 2.0246c0.049067 7.333e-4 0.10179 0.00611 0.13925 0.01405 0.31447 0.066642 0.42987 0.1768 0.48744 0.29955 0.027836 0.059346 0.020413 0.16256-0.018281 0.21527-0.091308 0.12438-0.23719 0.19374-0.43019 0.21562-0.068704 0.00782-0.18142 0.00429-0.24858-0.012018-0.20765-0.050476-0.32551-0.17752-0.3727-0.2982-0.023378-0.059785-0.015445-0.16676 0.015054-0.22332 0.057903-0.10735 0.16802-0.18016 0.3477-0.20682 0.022719-0.00334 0.050852-0.00458 0.080292-0.00419z" fill="#1b1b1b" filter="url(#d52)" strokeWidth=".96817" style={{ mixBlendMode: 'normal', paintOrder: 'markers stroke fill' }} />
        <path id="p" d="m3.0477 0.48827c-0.054508 7.319e-4 -0.10714 0.020146-0.14926 0.05505l-2.3701 1.965c-0.076474 0.063414-0.19028 0.17989-0.22168 0.27417-0.046167 0.13863-0.020278 0.27321 0.083302 0.40346 0.059678 0.07504 0.17765 0.17789 0.2518 0.23862 0.18654 0.15279 0.34099 0.21662 0.48686 0.25663 0.083584 0.022935 0.22288 0.035771 0.30951 0.034993l8.2165-0.073661c0.11159-9.851e-4 0.21908-0.042598 0.30266-0.11715l1.0281-0.91686c0.03066-0.027348 0.0424-0.070371 0.02994-0.10968l-0.55794-1.7601c-0.01417-0.044726-0.0418-0.11592-0.07024-0.15302-0.04148-0.054076-0.09866-0.097954-0.18567-0.12261-0.2575 0.00513-7.0361 0.026389-7.1537 0.025101zm-1.6538 2.0912c0.05068 7.575e-4 0.10514 0.00631 0.14383 0.014512 0.32481 0.068833 0.444 0.18261 0.50347 0.3094 0.028751 0.061297 0.021084 0.1679-0.018882 0.22235-0.09431 0.12847-0.24499 0.20011-0.44433 0.22271-0.070963 0.00808-0.18738 0.00443-0.25675-0.012413-0.21448-0.052135-0.33621-0.18336-0.38495-0.308-0.024147-0.06175-0.015953-0.17224 0.015549-0.23066 0.059807-0.11088 0.17354-0.18608 0.35913-0.21362 0.023466-0.00345 0.052524-0.00473 0.082932-0.00433z" fill="url(#a52)" style={{ paintOrder: 'markers stroke fill' }} strokeWidth=".089916" />
        <ellipse id="o" cx="8.4568" cy="1.8087" rx="1.2306" ry=".60125" fill="none" stroke="#a0a0a0" strokeWidth="1.0391" style={{ paintOrder: 'markers stroke fill' }} />
        <ellipse id="b" cx="8.4558" cy="1.7029" rx="1.2306" ry=".60125" fill="#8d8d8d" stroke="#8d8d8d" strokeWidth="1.0391" style={{ paintOrder: 'markers stroke fill' }} />
        <ellipse id="c" cx="8.4662" cy="1.1826" rx="1.3503" ry=".60125" fill="url(#j52)" stroke="#8d8d8d" strokeWidth=".50414" style={{ paintOrder: 'markers stroke fill' }} />
      </svg>
    </Draggable>
  );
}

ChipCardSVG.propTypes = {
  onCardRead: PropTypes.func,
};

export default ChipCardSVG;
