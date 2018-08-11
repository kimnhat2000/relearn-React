export const addCards = (cards=[]) => ({
    type: 'ADD_CARDS',
    cards
});

export const selectCard = (card='') => ({
    type: 'SELECT_CARD',
    card
})