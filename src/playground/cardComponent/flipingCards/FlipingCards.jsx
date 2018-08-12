import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { nameData } from '../../tools/tools';
import CardList from '../mainCardSelectionPage/CardList';

class FlipingCards extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            card: {},
            cardClick: '',
        };
    }

    componentDidMount = () => {
        const names = nameData()
        const cards = Array(15).fill().map((c, i) => ({ id: i, name: names[i], link: `url(/Pictures/warriors/warrior-${i + 1}.jpg)` }));
        const card = { id: 6, name: names[6], link: `url(/Pictures/warriors/warrior-${7}.jpg)` }
        this.setState({ cards, card });
    }

    onConnectClick = () => {
        const { cards, card } = this.props
        console.log( cards, card )
    }

    render(){
        const { cards } = this.state
        return (
            <div>
                <div>
                    <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                    <Link to='/cardDashBoard' style={{ textDecoration: 'none' }}><button>return to card selection</button></Link>
                    <button onClick={this.onConnectClick}>connect</button>
                </div>

                <div>
                    <CardList
                        cards={cards}
                        cardClick={this.onCardClick}
                    />
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    cards: state.cards,
    card: state.card
})

export default connect(mapStateToProps) (FlipingCards);