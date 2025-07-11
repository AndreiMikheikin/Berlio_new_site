import React from 'react';
import PropTypes from 'prop-types';

function PaymentCardIcon({
  fillColor = '#48AE5A', width = 69, height = 52, className = '',
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 69 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m47.313 35.167c-0.68 0-1.332 0.2897-1.812 0.8054-0.481 0.5158-0.751 1.2152-0.751 1.9446 0 0.7293 0.27 1.4288 0.751 1.9445 0.48 0.5157 1.132 0.8055 1.812 0.8055h8.541c0.68 0 1.332-0.2898 1.812-0.8055 0.481-0.5157 0.751-1.2152 0.751-1.9445 0-0.7294-0.27-1.4288-0.751-1.9446-0.48-0.5157-1.132-0.8054-1.812-0.8054zm-46.98-22.917c0-3.1605 1.17-6.1915 3.253-8.4263 2.082-2.2349 4.907-3.4904 7.852-3.4904h46.125c1.458 0 2.902 0.3083 4.249 0.9071 1.347 0.5989 2.571 1.4767 3.602 2.5833 1.031 1.1065 1.849 2.4202 2.407 3.866 0.558 1.4458 0.846 2.9954 0.846 4.5603v27.5c0 1.5649-0.288 3.1145-0.846 4.5603s-1.376 2.7595-2.407 3.8661c-1.031 1.1065-2.255 1.9843-3.602 2.5832s-2.791 0.9071-4.249 0.9071h-46.125c-2.945 0-5.77-1.2555-7.852-3.4903-2.083-2.2348-3.253-5.2659-3.253-8.4264zm63.209 4.5833v-4.5833c0-1.7018-0.63-3.3339-1.752-4.5373-1.121-1.2033-2.642-1.8794-4.227-1.8794h-46.125c-1.586 0-3.107 0.6761-4.228 1.8794-1.122 1.2034-1.752 2.8355-1.752 4.5373v4.5833zm-58.084 5.5v17.417c0 3.542 2.679 6.4167 5.98 6.4167h46.125c1.585 0 3.106-0.6761 4.227-1.8794 1.122-1.2034 1.752-2.8355 1.752-4.5373v-17.417z"
        fill={fillColor}
      />
    </svg>
  );
}

PaymentCardIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default PaymentCardIcon;
