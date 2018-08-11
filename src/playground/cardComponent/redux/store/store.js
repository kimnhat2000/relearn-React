import { createStore } from 'redux';

import { cardsReducer } from '../reducer/reducer';

export default () => {
    const store = createStore( cardsReducer );
    return store;
};
