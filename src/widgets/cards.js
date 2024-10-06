class CardsWidget {
    constructor({mtgService, menu, onCardTap}){
        this.mtgService = mtgService;
        this.menu = menu;
        this.listContainer = menu.querySelector('#listContainer');
        this.searchField = menu.querySelector('#searchCards');
        this.onCardTap = onCardTap

        this.loader = document.createElement('div');
        this.loader.classList.add('loader');

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
        if (scrollTop + containerHeight >= scrollHeight - 10 && !this.loading) {
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
        this.hasReachedMax = cards.length < this.pageSize; 
        if (cards.length == 0){
            this.listContainer.innerHTML = 'Nothing was found';
        } else {
            const ul = this.page == 1 ? document.createElement('ul') : this.listContainer.querySelector('ul');
            cards.forEach(card => {
                const li = document.createElement('li');
                li.textContent = card.name;
                li.addEventListener('click', () => {
                    this.onCardTap(card);
                });
                ul.appendChild(li);
            });
            this.listContainer.removeChild(this.loader);
            this.listContainer.appendChild(ul);
        }
        this.loading = false;
    }
}
export {CardsWidget};