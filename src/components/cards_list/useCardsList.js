import { useReducer, useEffect, useRef } from 'react';

const initialState = {
  cards: [],
  loading: false,
  pagesLoaded: 0,
  hasReachedMax: false,
  searchQuery: '',
};

const pageSize = 100;

const ActionTypes = { LOADED: 'LOADED', LOADING: 'LOADING', ERROR: 'ERROR', UPDATE_QUERY: 'UPDATE_QUERY'};

function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_QUERY:
        return { 
            ...state,  
            searchQuery: action.payload.searchQuery,
            cards: [],
            pagesLoaded: 0,
            hasReachedMax: false,
        };
    case ActionTypes.LOADING:
        return { ...state, loading: true };
    case ActionTypes.LOADED:
        return {
            ...state,
            cards: action.payload.page === 1 ? action.payload.cards : [...state.cards, ...action.payload.cards],
            loading: false,
            pagesLoaded: action.payload.page,
            hasReachedMax: action.payload.cards.length < pageSize,
        };
    case ActionTypes.ERROR:
        return { ...state, loading: false };
    default:
        return state;
  }
}

export const useCardsList = (mtgService, containerRef, inputRef) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const queryTimeoutRef = useRef(null);

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const loadPage = async (newSearchQuery) => {
        if (stateRef.current.loading || stateRef.current.hasReachedMax && (newSearchQuery == undefined)) return;
        if (newSearchQuery != undefined){
            dispatch({ type: ActionTypes.UPDATE_QUERY, payload: {searchQuery: newSearchQuery} });
        }
        dispatch({ type: ActionTypes.LOADING });
        try {
            const page = newSearchQuery == undefined ? stateRef.current.pagesLoaded + 1 : 1;
            const searchQuery = newSearchQuery ?? stateRef.current.searchQuery;
            const newCards = await mtgService.loadCards(pageSize, page, searchQuery);
            dispatch({ type: ActionTypes.LOADED, payload: { cards: newCards, page: page} });
        } catch (error) {
            dispatch({ type: ActionTypes.ERROR });
        }
    };

    useEffect(() => {
        const handleInputChange = () => {
            const newSearchQuery = inputRef.current.value;
            clearTimeout(queryTimeoutRef.current);
            queryTimeoutRef.current = setTimeout(() => {
                if (newSearchQuery != stateRef.current.searchQuery){
                    loadPage(newSearchQuery);
                }
            }, 600);
        };
        const input = inputRef.current;
        input.addEventListener('input', handleInputChange);
        return () => input.removeEventListener('input', handleInputChange);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = containerRef.current.scrollTop;
            const scrollHeight = containerRef.current.scrollHeight;
            const containerHeight = containerRef.current.clientHeight;
            if (scrollTop + containerHeight >= scrollHeight - 10) {
                loadPage();
            }
        };
        loadPage();
        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return { cards: state.cards, loading: state.loading };
};
