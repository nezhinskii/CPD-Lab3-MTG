import ReactDOM from 'react-dom/client'; 
import CardsList from './components/cards_list/cardsList';
import Deck from './components/deck';
import Stats from './components/stats/stats';
import { SelectedCardProvider } from './providers/selectedCardProvider';
import CardDetails from './components/cardDetails';
import { DeckProvider } from './providers/deckProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <header>
            <h1>MTG Deck Builder</h1>
        </header>
        <SelectedCardProvider>
            <DeckProvider>
                <main className="main">
                    <CardsList />
                    <div className="content">
                        <Deck />
                        <CardDetails/>
                    </div>
                    <Stats />
                </main>
            </DeckProvider>
        </SelectedCardProvider>
    </div>
);