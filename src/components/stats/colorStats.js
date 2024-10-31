import * as d3 from 'd3';

function dataFromDeck(deck) {
    const map = {
        'W': 0,
        'U': 0,
        'B': 0,
        'R': 0,
        'G': 0,
        'N': 0,
    };
    for (const [_, cards] of Object.entries(deck)){
        for (const card of cards){
            if (!card.colorIdentity || card.colorIdentity.length == 0){
                map['N']++;
                continue;
            }
            for (const color of card.colorIdentity){
                map[color]++;
            }
        }
    }
    const data = [];
    for (const key in map){
        data.push({color: key, count: map[key]});
    }
    return data;
}

function renderColorStats(deck, element) {
    if (!element){
        return;
    }
    element.innerHTML = '';
    const data = dataFromDeck(deck);

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.color))
        .range(['#FAFAFA', '#4682B4', '#000000', '#B22222', '#228B22', '#A9A9A9']);

    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    const label = document.createElement('label')
    label.textContent = "Deck Mana Color Distribution";
    label.classList.add("colorLabel");
    element.appendChild(label)
    const svg = d3.select(element)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.color));
};

export default renderColorStats;