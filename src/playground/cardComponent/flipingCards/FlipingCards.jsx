import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './flipingCard.css';
import { nameData, shuffleArray } from '../../tools/tools';

// cards render

const Card = ({ card, playingCards, onCardClick }) => {
    const style = {
        backgroundImage: `${card.link}`,
    }
    
    const cardClick = (c) => () => {
        onCardClick(c)
    }
    
    const cards = playingCards.map((c,i) => (
        <div key={i} 
            className='fliping-card' 
            style={{ backgroundImage: c.click ? `${c.link}` : '' }}
            onClick = {cardClick(c)}  
        />
    ))

    return (
        <div>
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
            cards: [],
            playingCards: [],
            card: {},
            cardClick: '',
            continue: false,
            noClick: false
        };
    }

    componentDidMount = () => {
        const names = nameData()
        const cards = Array(15).fill().map((c, i) => ({ id: i, name: names[i], link: `url(/Pictures/warriors/warrior-${i + 1}.jpg)` }));
        const card = { id: 7, name: names[7], link: `url(/Pictures/warriors/warrior-${8}.jpg)`, click: false }
        this.setState({ cards, card });
    }

    onPlay = () => {
        const { card } = this.state
        const emptyCard = { id: 1, name: 'empty', link: `url(/Pictures/warriors/warrior-${9}.jpg)`, click: false  };
        const playingCards = shuffleArray([ card, emptyCard ]);
        this.setState({ playingCards, continue: false, noClick: false, notice: '' });
    }

    onConnectClick = () => {
        const { cards, card } = this.state
        console.log( cards, card )
    }

    onCardClick = (card) => {
        if(this.state.continue || this.state.noClick) {
            return;
        } else if (card.id === this.state.card.id) {
            const playingCards = this.state.playingCards.map(c => c.id === card.id ? {...c, click: true} : c)
            this.setState({ notice: 'correct', playingCards, continue: true })
            return;
        } else {
            const playingCards = this.state.playingCards.map(c => c.id === card.id ? { ...c, click: true } : c)
            this.setState({ notice: 'wrong', playingCards, noClick: true })
            setTimeout(() => {
                const playingCards = this.state.playingCards.map(c => ({ ...c, click: false }))
                this.setState({ notice: '', playingCards })
            }, 1000);
            return;
        }
    }

    render(){
        const { card, playingCards, notice } = this.state
        return (
            <div>
                <div>
                    <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                    <Link to='/cardDashBoard' style={{ textDecoration: 'none' }}><button>return to card selection</button></Link>
                </div>
                <button onClick={this.onPlay}>play</button>
                <Card
                    card = {card}
                    playingCards = {playingCards}
                    onCardClick = {this.onCardClick}
                />
                <h4>{notice}</h4>
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    cards: state.cards,
    card: state.card
})

export default connect(mapStateToProps) (FlipingCards);