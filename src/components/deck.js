import React from 'react';
import { useDeckContext } from '../providers/deckProvider';

function Deck() {
	const { deck, removeCard } = useDeckContext();
	return (
		<div id="deck">
			<h3>Your deck</h3>
			<div id="deckContainer">
				{Object.entries(deck).map(([name, cards]) => (
					<div key={name} className="deckCard">
						<img src={cards[0].imageUrl} alt={cards[0].name} />
						<p>{name}</p>
						<p>Count: {cards.length}</p>
						<button className="removeButton" onClick={() => removeCard(name)}>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Deck;