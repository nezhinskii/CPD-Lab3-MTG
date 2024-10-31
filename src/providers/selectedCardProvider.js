import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export function SelectedCardProvider({ children }) {
    const [selectedCard, setSelectedCard] = useState(null);
    return (
        <CardContext.Provider value={{ selectedCard, setSelectedCard }}>
            {children}
        </CardContext.Provider>
    );
};

export function useSelectedCardContext() {
    return useContext(CardContext);
};