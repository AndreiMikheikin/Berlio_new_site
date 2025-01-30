import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/CardBox.scss';

const CardBox = ({ CSSSelectorPrefix, Icon, title, description }) => {
    return (
        <div className={`${CSSSelectorPrefix}__card-box`}>
            {Icon && (
                <div className={`${CSSSelectorPrefix}__icon`}>
                    <Icon />
                </div>
            )}
            <h3 className={`${CSSSelectorPrefix}__card-title`}>{title}</h3>
            {description && (
                <div className={`${CSSSelectorPrefix}__card-description`}>{description}</div>
            )}
        </div>
    );
};

CardBox.propTypes = {
    Icon: PropTypes.elementType, // Ожидается React-компонент
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    CSSSelectorPrefix: PropTypes.string.isRequired,
};

CardBox.defaultProps = {
    description: '', // По умолчанию описание пустое
};

export default CardBox;