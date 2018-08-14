import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import './flipingCard.css';
import { shuffleArray } from '../../tools/tools';

// drop down menu
class DropDownMenu extends React.Component{
    constructor(props) {
        super();
        this.state = {
            showItems: false,
            buttonContain: 'add more cards',
        }

    }

    onShowCards = () => {
        this.setState({ showItems: !this.state.showItems })

    }

    onChooseCard = (item) => () => {
        this.props.clickedItems(item);
        this.setState({ showItems: false, buttonContain: `${item.placeholder}` })
    }

    render(){
        const { dropDownItems } = this.props
            const dropDown = dropDownItems.map((item, index) => (
                <div key={index} className='item-drop-down' onClick={this.onChooseCard(item)}>
                    {item.placeholder}
                </div>
            ));
        return(
            <div>
                <button onClick={this.onShowCards}>{this.state.buttonContain}</button>
                {this.state.showItems &&
                    <div>
                        {dropDown}
                    </div>
                }
            </div>
        )
    }
}

// cards render
const Card = ({ card, playingCards, onCardClick }) => {
    const style = {
        backgroundImage: `${card.link}`,
    }
    
    const cardClick = (c) => () => {
        onCardClick(c)
    }
    
    const cards = playingCards.map((c,i) => (
            <div
                key={i} 
                className='fliping-card'
                style={{ backgroundImage: c.click ? `${c.link}` : '' }}
                onClick = {cardClick(c)}
            />
    ))

    return (
        <div className='playing-card'>
            <div className='big-card' style={style} />
            <div className='playing-card'>
                {cards}
            </div>
        </div>
    )
}

// main app

class FlipingCards extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            playingCards: [],
            numberOfPlayingCards: 2,
            card: {},
            cardClick: '',
            continue: false,
            noClick: false,
            buttonName: 'play',
            moneyYouHave: 5,
            moneyYouBet: 0,
            dropDownItems: [
                {cardsNumber: 2, placeholder: '2 cards (bet money x 2)', multiply: 2, },
                {cardsNumber: 3, placeholder: '3 cards (bet money x 4)', multiply: 4, },
                {cardsNumber: 4, placeholder: '4 cards (bet money x 15)', multiply: 15, },
                {cardsNumber: 5, placeholder: '5 cards (bet money x 30)', multiply: 30, },
                {cardsNumber: 6, placeholder: '6 cards (bet money x 60)', multiply: 60, },
            ],
            itemClicked: { cardsNumber: 2, placeholder: '2 cards (bet money x 2)', multiply: 2 },
            totalCardsInData: 15,
            emptyCard: ''
        };
    }

    componentDidMount = () => {
        const propsCard = { ...this.props.card, click: false };
        const randomNum = Math.floor(Math.random()*this.state.totalCardsInData)
        const randomCard = { id: {randomNum}, name: 'empty', link: `url(/Pictures/warriors/warrior-${randomNum+1}.jpg)`, click: false }
        let card = this.props.card ? propsCard : randomCard
        this.setState({ card })
    }

    componentDidUpdate = () => {

    }

    onPlay = () => {
        const { card } = this.state
        let i = this.state.totalCardsInData
        const emptyCard = { id: i+1, name: 'empty', link: `url(/Pictures/warriors/Joker.jpg)`, click: false  };
        const playingCards = shuffleArray([ card, emptyCard ]);
        this.setState({ playingCards, continue: false, noClick: false, notice: '', emptyCard });
    }

    onRestart = () => {
        const { cards, card } = this.state;
        const playingCards = shuffleArray(this.state.playingCards.map(c => ({ ...c, click: false })));
        this.setState({ cards, card, playingCards, cardClick:'', continue: false, noClick: false, moneyYouBet: 0, moneyYouHave: 5, notice: '' });
    }

    onCardClick = (card) => {
        const { moneyYouBet, itemClicked } = this.state
        let moneyYouHave = this.state.moneyYouHave

        if(moneyYouBet < Math.round(moneyYouHave * 30 / 100)) {
            this.setState({ notice: `you must bet at least ${Math.round(moneyYouHave * 30 / 100)}$, 30% of your money`});
            return;
        }

        if(this.state.moneyYouHave === 0) {
            this.setState({ notice: 'you lose the game'});
            return; 
        }
        if(this.state.noClick) {
            return;
        } else if (card.id === this.state.card.id) {
            const playingCards = this.state.playingCards.map(c => c.id === card.id ? { ...c, click: true } : c);
            this.setState({ notice: 'correct', playingCards, noClick: true, moneyYouHave: moneyYouHave - moneyYouBet + moneyYouBet*itemClicked.multiply  })
            this.stopClick();
            return;
        } else {
            moneyYouHave = moneyYouHave - moneyYouBet;
            const playingCards = this.state.playingCards.map(c => ({ ...c, click: true }));
            this.setState({ notice: 'wrong', playingCards, noClick: true, moneyYouHave })
            if (moneyYouHave === 0) {
                this.setState({ notice: 'you lose the game', moneyYouHave });
                return;
            } else {
                this.stopClick();
                return;
            }
        }
    }

    onBet = (e) => {
        const moneyYouHave = this.state.moneyYouHave;
        const mustBet = Math.round(moneyYouHave * 30 / 100);
        const moneyYouBet = +e.target.value;
        this.setState({ moneyYouBet })
        if (moneyYouBet > moneyYouHave){
            this.setState({ notice: 'you cannot bet more than you have', moneyYouBet: moneyYouHave });
            setTimeout(() => {
                this.setState({ notice: '' });
            }, 2000)
            return;
        } else if (moneyYouBet < mustBet) {
            this.setState({ notice: `you must bet at least ${mustBet}$, 30% of your money` });
            setTimeout(() => {
                this.setState({ notice: '' });
            }, 2000)
            return;
        }
    }

    clickedItems = (item) => {
        const itemClicked = item;
        const numberOfPlayingCards = item.cardsNumber;
        const { emptyCard, card } = this.state
        const emptyCards = Array(numberOfPlayingCards - 1).fill().map(c => (c={ ...emptyCard }))
        const allCards = [...emptyCards, card];
        const playingCards = shuffleArray(allCards);
        this.setState({ playingCards, numberOfPlayingCards, continue: false, noClick: false, notice: '', itemClicked });
        console.log(playingCards)
    }

    stopClick = () => {
        setTimeout(() => {
            const playingCards = shuffleArray(this.state.playingCards.map(c => ({ ...c, click: false })));
            this.setState({ notice: '', playingCards, noClick: false });
        }, 1000);
    }

    render(){
        const { card, playingCards, notice, moneyYouBet, moneyYouHave, dropDownItems } = this.state
        return (
            <div>
                <div>
                    <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                    <Link to='/cardDashBoard' style={{ textDecoration: 'none' }}><button>return to card selection</button></Link>
                </div>

                {playingCards.length !== 0 &&
                <div className='flipping-card-menu'>
                    <div className='button'>
                        <button onClick={this.onRestart}>restart</button>
                        <input type='number' value={moneyYouBet} onChange={this.onBet} />
                    </div>
                    <DropDownMenu
                        dropDownItems = {dropDownItems}
                        clickedItems = {this.clickedItems}
                    />
                </div>
                }

                <Card
                    card = {card}
                    playingCards = {playingCards}
                    onCardClick = {this.onCardClick}
                />
                 {playingCards.length === 0 &&
                    <div className='button'>
                        <button onClick={this.onPlay}>play</button>
                    </div>
                 }
                <h4>{notice}</h4>
                <div className='text-notice'>
                    <h4>money: <NumberFormat value={moneyYouHave} displayType={'text'} thousandSeparator={true} prefix={'$ '} /> </h4>
                    
                    <h4>you bet: <NumberFormat value={moneyYouBet} displayType={'text'} thousandSeparator={true} prefix={'$ '} /></h4>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    card: state.card
})

export default connect(mapStateToProps) (FlipingCards);