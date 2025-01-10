import React, { createContext, useState, useEffect } from 'react';

export const SelectedItemContext = createContext({
  selectedItem: 'defaultItem',
  setSelectedItem: () => {},
});

export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(() => {
    // Проверяем наличие сохраненного значения в sessionStorage
    const savedItem = sessionStorage.getItem('selectedItem');
    return savedItem ? JSON.parse(savedItem) : null; // Если есть, восстанавливаем, иначе - null
  });

  useEffect(() => {
    if (selectedItem) {
      // Сохраняем состояние в sessionStorage, если оно изменилось
      sessionStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    }
  }, [selectedItem]);

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};
