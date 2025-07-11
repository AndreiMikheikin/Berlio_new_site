import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

export const SelectedItemContext = createContext({
  selectedItem: 'defaultItem',
  setSelectedItem: () => {},
});

export function SelectedItemProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null); // ← Инициализируем пустым

  // Только в браузере
  useEffect(() => {
    const savedItem = sessionStorage.getItem('selectedItem');
    if (savedItem) {
      setSelectedItem(JSON.parse(savedItem));
    }
  }, []);

  useEffect(() => {
    if (selectedItem !== null) {
      sessionStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    }
  }, [selectedItem]);

  const value = useMemo(() => ({ selectedItem, setSelectedItem }), [selectedItem]);

  return (
    <SelectedItemContext.Provider value={value}>
      {children}
    </SelectedItemContext.Provider>
  );
}

SelectedItemProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
