import {MtgService} from "./api/mtg";
import {CardsWidget} from "./widgets/cards";
import {ColorStatsWidget} from "./widgets/colorStats";
import {ManaCostStatsWidget} from "./widgets/manaCostStats";
import {CardDetailsWidget} from "./widgets/cardDetails";
import {DeckWidget} from "./widgets/deck";
import {DeckController} from "./controllers/deck";

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const deck = new DeckController(() => {
        deckWidget.build(deck);
        manaCostStatsWidget.build(deck);
        colorStatsWidget.build(deck);
    });

    const mtgService = new MtgService();

    const colorStatsWidget = new ColorStatsWidget(document.getElementById("colorStats"));
    const manaCostStatsWidget = new ManaCostStatsWidget(document.getElementById("manaStats"));
    const deckWidget = new DeckWidget({
        element: document.getElementById('deckContainer'),
        removeCallback: (name) => {
            deck.removeCard(name);
        }
    });
    const cardDetailsWidget = new CardDetailsWidget({
        element: document.getElementById('cardDetails'),
        addCard: (card) => {
            try{
                deck.addCard(card);
            } catch (error){
                alert(error);
            }
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
}
