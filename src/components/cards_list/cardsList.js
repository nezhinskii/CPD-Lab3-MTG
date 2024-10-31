import React, { useRef } from 'react';
import { useSelectedCardContext } from '../../providers/selectedCardProvider'; 
import { useCardsList } from './useCardsList';
import { MtgService } from '../../api/mtg';

function CardsList() {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { cards, loading } = useCardsList(new MtgService(), containerRef, inputRef);
  const { setSelectedCard } = useSelectedCardContext();
  
  return (
    <div ref={containerRef} id="menu">
      <h2>Cards</h2>
      <input ref={inputRef} type="text" id="searchCards" placeholder="Search cards..." />
      <div id="listContainer">
        {cards.length === 0 && !loading && <div>Nothing was found</div>}
        <ul>
            {cards.map(card => (
                <li key={card.id} onClick={() => setSelectedCard(card)}>
                    {card.name}
                </li>
            ))}
        </ul>
        {loading && <div className="loader"></div>}
      </div>
    </div>
  );
}

export default CardsList;