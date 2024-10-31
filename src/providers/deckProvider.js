import React, { createContext, useContext, useState } from 'react';

const DeckContext = createContext();
const maxRegularCards = 4;
const maxUniqueCards = 1;

export function DeckProvider({ children }) {
    const [deck, setDeck] = useState({});

    const addCard = (card) => {
        const newDeck = { ...deck };
        const cardName = card.name;
        const isUnique = 'supertypes' in card && card.supertypes.includes('Legendary');
        if (!newDeck[cardName]) {
            newDeck[cardName] = [];
        }

        if (card.type.startsWith('Basic Land')){
            newDeck[cardName].push(card);
            return;
        }

        if (isUnique && newDeck[cardName].length == maxUniqueCards || !isUnique && newDeck[cardName].length == maxRegularCards){
            alert('There is already a maximum number of cards of this type in the deck');
            return;
        } else {
            newDeck[cardName].push(card);
        }

        setDeck(newDeck);
    };

    const removeCard = (name) => {
        if (!deck[name]){
            return;
        }

        const newDeck = { ...deck };
        const cards = newDeck[name];
        if (cards.length == 1){
            delete newDeck[name];
        } else {
            cards.pop();
        }
        setDeck(newDeck);
    };

    return (
        <DeckContext.Provider value={{ deck: deck, addCard, removeCard }}>
            {children}
        </DeckContext.Provider>
    );
};

export function useDeckContext() {
    return useContext(DeckContext);
};