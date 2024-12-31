import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Text.scss';

const Text = ({ children, variant = 'body', className = '' }) => {
  const Tag = variant === 'title' ? 'h1' : variant === 'subtitle' ? 'h2' : 'p';

  return <Tag className={`aam_text ${className}`}>{children}</Tag>;
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['title', 'subtitle', 'body']),
  className: PropTypes.string,
};

export default Text;
