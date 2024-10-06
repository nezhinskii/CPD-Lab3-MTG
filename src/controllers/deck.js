class DeckController{
    #deck = {};
    #maxRegularCards = 4;
    #maxUniqueCards = 1;
    constructor(updateCallback){
        this.updateCallback = updateCallback;
    }

    addCard(card) {
        const cardName = card.name;
        const isUnique = 'supertypes' in card && card.supertypes.includes('Legendary');
        if (!this.#deck[cardName]) {
            this.#deck[cardName] = [];
        }

        if (card.type.startsWith('Basic Land')){
            this.#deck[cardName].push(card);
            this.updateCallback();
            return;
        }

        if (isUnique && this.#deck[cardName].length == this.#maxUniqueCards || !isUnique && this.#deck[cardName].length == this.#maxRegularCards){
            throw 'There is already a maximum number of cards of this type in the deck';
        } else {
            this.#deck[cardName].push(card);
            this.updateCallback();
        }
    }

    removeCard(name) {
        if (!this.#deck[name]){
            return;
        }
        const cards = this.#deck[name];
        if (cards.length == 1){
            delete this.#deck[name];
        } else {
            cards.pop();
        }
        this.updateCallback();
    }

    *names() {
        for (const name of Object.keys(this.#deck)) {
            yield name;
        }
    }

    *[Symbol.iterator]() {
        for (const [name, cards] of Object.entries(this.#deck)) {
            yield [name, Array.from(cards)];
        }
    }

    getCardsByName(name){
        return this.#deck[name] ? Array.from(this.#deck[name]) : undefined;
    }
}
export {DeckController}