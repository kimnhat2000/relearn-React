import React from 'react';

export const Card = ({ card, cardClick, showList }) => {

    const onCardClick = (card) => () => {
        cardClick(card)
    }

    const style = {
        backgroundImage: `${card.link}`,
        backgroundColor: 'rgb(150,150,150)',
    }

    return(
        <div>
            {showList ?
                <div className='big-card' style={style} /> :
                <div className='warrior' onClick={onCardClick(card)} style={style} />   
            }
        </div>
    )
}
