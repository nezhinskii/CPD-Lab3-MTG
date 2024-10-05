import { MtgService} from "./api/mtg";
import {CardsWidget} from "./widgets/cards";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const mtgService = new MtgService();
    new CardsWidget({
        mtgService: mtgService, 
        menu: document.getElementById('menu'), 
        listContainer: document.getElementById('listContainer'), 
        searchField: document.getElementById('searchCards'),
        onCardTap: (card) => {
            console.log(card);
        }
    }).init();
    // new ColorStats().buildStats(document.getElementById("colorStats"));
    // new ManaCostStats().buildStats(document.getElementById("manaStats"));
}
