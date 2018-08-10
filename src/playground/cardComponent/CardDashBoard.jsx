import React from 'react';
import CardList from './CardList';
import { nameData } from '../tools/tools';
import { Card } from './Card';

class CardDashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cards:[],
            card: '',
            cardsNUmber: 15,
        }
    }

    componentDidMount = (state, props) => {
        const names = nameData();
        let cards = Array(this.state.cardsNUmber).fill().map((c, i) => ({ id: i, name: names[i], link: `url(/Pictures/warriors/warrior-${i+1}.jpg)`}));
        this.setState({ cards });
    }

    onCardClick = (card) => {
        this.setState({ card });
    }

    render() {
        const {cards, card} = this.state
        return(
            <div>
                <div>
                    <CardList
                        cards={cards}
                        cardClick={this.onCardClick}
                    />
                </div>

                <div className='selected-card'>
                    <Card
                        card={card}
                        cardClick={this.onCardClick}
                        showList={true}
                    />
                </div>
                {card &&
                    <div>
                    <h4>do you want to select <span>{card.name}</span>?</h4>
                        <div className='button'>
                            <button>Yes</button>
                            <button>No</button>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default CardDashBoard;