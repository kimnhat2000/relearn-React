import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AppGatheringHall = ({cards, card}) => {
    const click = () => {

    }
    return (
        <div>
            <Link to='/therapeuticEffects' style={{ textDecoration: 'none' }}><button>therapeutic effects</button> </Link>
            <Link to='/luckGame' style={{ textDecoration: 'none' }}><button>luck game</button> </Link>
            <Link to='/cardDashBoard' style={{ textDecoration: 'none' }}><button>card dashboard</button></Link>
            <Link to='/flipingCards' style={{ textDecoration: 'none' }}><button>fliping cards game</button></Link>
            <Link to='/D3js' style={{ textDecoration: 'none' }}><button>D3 learning</button></Link>
            <button onClick={click}>click</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        card: state.card,
    }
}

export default connect(mapStateToProps) (AppGatheringHall);