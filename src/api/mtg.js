class MtgService {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
    }

    async loadCards(pageSize = 100, page = 1, name = '') {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // return [...Array(page < 4 ? 100 : 50)].map((_, i) => ({name: `Card name ${(page - 1) * pageSize + i}`}));
        const url = new URL('cards', this.baseUrl).toString() + '?' + new URLSearchParams({
            pageSize: pageSize,
            page: page,
            name: name
        }).toString();
        return fetch(url).then(response=>response.json()).then(json=>json.cards)
    }
}


export {MtgService}
