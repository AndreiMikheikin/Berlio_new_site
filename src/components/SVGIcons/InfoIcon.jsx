import React from 'react';

const InfoIcon = ({ fillColor = '#48AE5A', width = 60, height = 61, className = '' }) => (
    <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 60 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M30 58C45.1878 58 57.5 45.6878 57.5 30.5C57.5 15.3122 45.1878 3 30 3C14.8122 3 2.5 15.3122 2.5 30.5C2.5 45.6878 14.8122 58 30 58Z"
            stroke={fillColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M30 41.5V30.5M30 19.5H30.0275"
            stroke={fillColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default InfoIcon;