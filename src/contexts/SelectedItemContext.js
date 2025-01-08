import React, { createContext, useState } from 'react';

export const SelectedItemContext = createContext({
    selectedItem: 'defaultItem', // Задайте значение по умолчанию
    setSelectedItem: () => {}, // Заглушка для setSelectedItem
  });

export const SelectedItemProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SelectedItemContext.Provider>
    );
};
