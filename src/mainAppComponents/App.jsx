import React from 'react';
import LuckTestGame from '../playground/luckTestGame/LuckTestGame';
import TherapeuticEffect from '../playground/therapeuticEffect/TherapeuticEffect';
import CardDashBoard from '../playground/cardComponent/CardDashBoard';
import './style.css';

const App = () => {
    const showApp = false;
    return(
    <div>
        {showApp &&
        <div>
            <TherapeuticEffect />
            <LuckTestGame />
        </div>
        }
        <CardDashBoard />
    </div>
    )
}

export default App;