import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/List.scss';

const List = ({ items, className = '' }) => {
  return (
    <ul className={`aam_list ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="aam_list-item">
          {item}
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
};

export default List;
