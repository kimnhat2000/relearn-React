const cardsDefaultState = {
    cards: [],
    card: '',
}

export const cardsReducer = (state = cardsDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CARDS':
            return {
                ...state,
                cards: [...action.cards]
            }
        case 'SELECT_CARD':
            return {
                ...state,
                card: action.card
            }
        default:
            return state;
    }
}