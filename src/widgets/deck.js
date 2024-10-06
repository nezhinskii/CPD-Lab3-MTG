class DeckWidget {
    constructor({element, removeCallback}) {
        this.element = element;
        this.removeCallback = removeCallback;
    }

    build(deck) {
        this.element.innerHTML = '';

        for (const name in deck) {
            const cards = deck[name];
            const cardElement = document.createElement('div');
            cardElement.className = 'deckCard';

            const image = document.createElement('img');
            image.src = cards[0].imageUrl;
            image.alt = cards[0].name;
            cardElement.appendChild(image);

            const cardName = document.createElement('p');
            cardName.textContent = name;
            cardElement.appendChild(cardName);

            const count = document.createElement('p');
            count.textContent = `Count: ${cards.length}`;
            cardElement.appendChild(count);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'removeButton';
            removeButton.onclick = () => this.removeCallback(name);
            cardElement.appendChild(removeButton);
            this.element.appendChild(cardElement);
        }
    }
}

export {DeckWidget}