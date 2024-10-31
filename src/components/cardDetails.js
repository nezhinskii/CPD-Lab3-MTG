import { useSelectedCardContext } from '../providers/selectedCardProvider'; 
import { useDeckContext } from '../providers/deckProvider';

function CardDetailsWidget() {
    const { selectedCard } = useSelectedCardContext();
    const { addCard } = useDeckContext();
    if (!selectedCard) {
        return null;
    }

    return (
        <div id="cardDetails">
        <img src={selectedCard.imageUrl} alt={selectedCard.name} />
        <div id="cardInfo">
            <h3>{selectedCard.name}</h3>
            <p>{selectedCard.text}</p>
            <button onClick={() => addCard(selectedCard)}>Add to deck</button>
        </div>
        </div>
    );
};

export default CardDetailsWidget;