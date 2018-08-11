import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class FlipingCards extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onConnectClick = () => {
        const { cards, card } = this.props
        console.log( cards, card )
    }

    render(){
        return (
            <div>
                <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                <Link to='/cardDashBoard' style={{ textDecoration: 'none' }}><button>return to card selection</button></Link>
                <button onClick={this.onConnectClick}>connect</button>
            </div>
        )
    }
} 

const mapStateToProps = (state) => ({
    cards: state.cards,
    card: state.card
})

export default connect(mapStateToProps) (FlipingCards);