import {MtgService} from "./api/mtg";
import {CardsWidget} from "./widgets/cards";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";
import {CardDetailsWidget} from "./widgets/cradDetails";
import { DeckWidget} from "./widgets/deck";

document.addEventListener("DOMContentLoaded", setup)

const deck = new Map();

const maxRegularCards = 4;
const maxUniqueCards = 1;
function addCardToDeck(card, updateCallback) {
    const cardName = card.name;
    const isUnique = 'supertypes' in card && card.supertypes.includes('Legendary');
    if (!deck[cardName]) {
        deck[cardName] = [];
    }

    if (card.type.startsWith('Basic Land')){
        deck[cardName].push(card);
        updateCallback();
        return;
    }

    if (isUnique && deck[cardName].length == maxUniqueCards || !isUnique && deck[cardName].length == maxRegularCards){
        alert('There is already a maximum number of cards of this type in the deck');
    } else {
        deck[cardName].push(card);
        updateCallback();
    }
}

function removeCardFromDeck(name, updateCallback) {
    if (!deck[name]){
        return;
    }
    const cards = deck[name];
    if (cards.length == 1){
        delete deck[name];
    } else {
        cards.pop();
    }
    updateCallback();
}

function setup() {
    const mtgService = new MtgService();
    const deckWidget = new DeckWidget({
        element: document.getElementById('deckContainer'),
        removeCallback: (name) => {
            removeCardFromDeck(name, () => {deckWidget.build(deck);});
        }
    });
    const cardDetailsWidget = new CardDetailsWidget({
        element: document.getElementById('cardDetails'),
        addCard: (card) => {
            addCardToDeck(card, () => {deckWidget.build(deck);});
        }
    });
    const cardsWidget = new CardsWidget({
        mtgService: mtgService, 
        menu: document.getElementById('menu'), 
        onCardTap: (card) => {
            cardDetailsWidget.build(card);
        }
    });
    cardsWidget.init();
    
    

    new ColorStats().buildStats(document.getElementById("colorStats"));
    new ManaCostStats().buildStats(document.getElementById("manaStats"));
}
