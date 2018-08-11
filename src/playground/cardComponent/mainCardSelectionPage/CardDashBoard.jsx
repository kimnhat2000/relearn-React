import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CardList from './CardList';
import { nameData } from '../../tools/tools';
import { Card } from './Card';
import { addCards, selectCard } from '../redux/action/actions';

class CardDashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardsNUmber: 15,
            bigCardShow: false,
            cardListShow: true,
            showSelectCardButton: true,
            showCardActions: false
        }
    }

    componentDidMount = () => {
        const names = nameData();
        let cards = Array(this.state.cardsNUmber).fill().map((c, i) => ({ id: i, name: names[i], link: `url(/Pictures/warriors/warrior-${i+1}.jpg)`}));
        this.props.dispatchCards(cards)
    }

    onCardClick = (card) => {
        this.props.dispatchCard(card);
        this.setState({ bigCardShow: true })
    }

    onSelectCard = () => {
        this.setState({ cardListShow: false, showSelectCardButton: false, showCardActions: true })
    }

    onReselectCards = () => {
        this.setState({ cardListShow: true, showSelectCardButton: true, showCardActions: false, bigCardShow: false })
    }

    render() {
        const {cards, card} = this.props
        return(
            <div>
                {this.state.cardListShow &&
                    <div>
                        <CardList
                            cards={cards}
                            cardClick={this.onCardClick}
                        />
                    </div>
                }

                {this.state.bigCardShow &&
                <div>
                    <div className='selected-card'>
                        <Card
                            card={card}
                            cardClick={this.onCardClick}
                            showList={true}
                        />
                    </div>

                    {this.state.showSelectCardButton &&
                        <div>
                            <h4>do you want to select <span>{card.name}</span>?</h4>
                            <div className='button'>
                                <button onClick={this.onSelectCard}>Choose this card</button>
                            </div>
                        </div>
                    }
                </div>
                }

                {this.state.showCardActions &&
                    <div>
                        <h4>what do you want to do with this card?</h4>
                        <div className='button'>
                            <Link to='/flipingCards' style={{ textDecoration: 'none' }}><button>play fliping</button></Link>

                            <button onClick={this.onReselectCards}>select another card</button>
                        </div>
                    </div>

                }

                <div className='button'>
                    <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchCards: (cards) => dispatch(addCards(cards)),
    dispatchCard: (card) => dispatch(selectCard(card))
});

const mapStateToProps = (state) => ({
    cards: state.cards,
    card: state.card
})

export default connect(mapStateToProps, mapDispatchToProps)(CardDashBoard);