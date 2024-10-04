import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const mtg = new Mtg();
    mtg.loadCards()
        .then((cards) => {
            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');

            cards.forEach(card => {
                const listItem = document.createElement('li');
                listItem.innerHTML = card.name;
                list.appendChild(listItem)
            })
            menu.innerHTML = ''

            menu.appendChild(list);


            new ColorStats().buildStats(document.getElementById("colorStats"));
            new ManaCostStats().buildStats(document.getElementById("manaStats"));

        })
}
