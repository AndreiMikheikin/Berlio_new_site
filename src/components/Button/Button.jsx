import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.scss';

const Button = ({ label, onClick, type = 'button', className = '', disabled = false }) => {
    return (
        <button 
            type={type} 
            className={`aam_button--${className}`} 
            onClick={onClick} 
            disabled={disabled}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired, // Текст кнопки
    onClick: PropTypes.func,           // Обработчик клика
    type: PropTypes.oneOf(['button', 'submit', 'reset']), // Тип кнопки
    className: PropTypes.string,       // Дополнительные классы
    disabled: PropTypes.bool,          // Состояние disabled
};

export default Button;
