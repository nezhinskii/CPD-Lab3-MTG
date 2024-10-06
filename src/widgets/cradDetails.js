class CardDetailsWidget{
    constructor({element, addCard}){
        this.element = element;
        this.cardInfo = document.createElement('div');
        this.cardInfo.id = 'cardInfo';
        this.addCard = addCard;
    }

    build(card){
        this.element.style.display = 'flex';
        this.element.innerHTML = '';
        this.cardInfo.innerHTML = '';

        const cardImage = document.createElement('img');
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name;
        cardImage.style.width = '300px';

        const cardName = document.createElement('h3');
        cardName.textContent = card.name;

        const cardDescription = document.createElement('p');
        cardDescription.textContent = card.text || "Описание отсутствует";

        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить в колоду';
        addButton.onclick = () => this.addCard(card);

        this.cardInfo.appendChild(cardName);
        this.cardInfo.appendChild(cardDescription);
        this.cardInfo.appendChild(addButton);
        this.element.appendChild(cardImage);
        this.element.appendChild(this.cardInfo);
    }
}
export {CardDetailsWidget}