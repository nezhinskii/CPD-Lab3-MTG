class CardsWidget {
    constructor({mtgService, menu, listContainer, searchField, onCardTap}){
        this.mtgService = mtgService;
        this.menu = menu;
        this.listContainer = listContainer;
        this.searchField = searchField;
        this.onCardTap = onCardTap

        this.loader = document.createElement('div');
        this.loader.classList.add('loader');

        this.cardsList = [];
        this.page = 1;
        this.pageSize = 100;
        this.loading = false;
        this.hasReachedMax = false;
        this.searchQuery = '';
        this.typingTimer = null;
        this.searchDelay = 600; 
    }

    async init(){
        this.fetchPage();
        this.menu.addEventListener('scroll', this.onScroll.bind(this));
        this.searchField.addEventListener('input', this.onSearchInput.bind(this));
    }

    onSearchInput(event) {
        const currentValue = event.target.value;
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            if (currentValue === this.searchField.value && currentValue != this.searchQuery && !this.loading) {
                this.searchQuery = currentValue;
                this.page = 1;
                this.cardsList = [];
                this.hasReachedMax = false;
                this.listContainer.innerHTML = '';
                this.fetchPage();
            }
        }, this.searchDelay);
    }

    onScroll() {
        const scrollTop = this.menu.scrollTop;
        const scrollHeight = this.menu.scrollHeight;
        const containerHeight = this.menu.clientHeight;
        if (scrollTop + containerHeight >= scrollHeight && !this.loading) {
            this.page++;
            this.fetchPage();
        }
    }

    async fetchPage() {
        if (this.hasReachedMax){
            return;
        }
        this.listContainer.appendChild(this.loader);
        this.loading = true;

        const cards = await this.mtgService.loadCards(this.pageSize, this.page, this.searchQuery);
        this.cardsList.push(...cards);
        this.hasReachedMax = cards.length < this.pageSize; 

        const ul = document.createElement('ul');
        this.cardsList.forEach(card => {
            const li = document.createElement('li');
            li.textContent = card.name;
            li.addEventListener('click', () => {
                this.onCardTap(card);
            });
            ul.appendChild(li);
        });
        this.listContainer.innerHTML = '';
        this.listContainer.appendChild(ul);
        this.loading = false;
    }
}
export {CardsWidget};