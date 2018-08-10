import React from 'react';
import { Card } from './Card';

const CardList = ({ cards, cardClick, showList }) => {
    const allCards = cards.map((c,i) => (
        <div key={i}>
            <Card card={c} cardClick={cardClick} showList={showList}/>
        </div>
    ))
    return(
        <div className='warriors'>
            {allCards}
        </div>
    )
}

export default CardList