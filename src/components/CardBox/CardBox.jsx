import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/CardBox.scss';

const CardBox = ({ CSSSelectorPrefix, Icon, title }) => {
    return (
        <div className={`${CSSSelectorPrefix}__card-box`}>
            {Icon && (
                <div className={`${CSSSelectorPrefix}__icon`}>
                    <Icon />
                </div>
            )}
            <h3 className={`${CSSSelectorPrefix}__card-title`}>{title}</h3>
        </div>
    );
};

CardBox.propTypes = {
    Icon: PropTypes.elementType, // Ожидается React-компонент
    title: PropTypes.string.isRequired,
    CSSSelectorPrefix: PropTypes.string.isRequired,
};

export default CardBox;
