import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function PageTitle({ titleKey }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t(titleKey);
  }, [t, titleKey]);

  return null;
}

PageTitle.propTypes = {
  titleKey: PropTypes.string.isRequired,
};

export default PageTitle;
