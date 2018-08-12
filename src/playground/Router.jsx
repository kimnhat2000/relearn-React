import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppGatheringHall from './AppsGatheringHall'
import LuckTestGame from './luckTestGame/LuckTestGame';
import TherapeuticEffect from './therapeuticEffect/TherapeuticEffect';
import CardDashBoard from './cardComponent/mainCardSelectionPage/CardDashBoard';
import FlipingCards from './cardComponent/flipingCards/FlipingCards';
import D3 from './D3jsLearningFiles/D3';


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' component={AppGatheringHall} exact={true} />
            <Route path='/luckGame' component={LuckTestGame} />
            <Route path='/therapeuticEffects' component={TherapeuticEffect} />
            <Route path='/cardDashBoard' component={CardDashBoard} />
            <Route path='/flipingCards' component={FlipingCards} />
            <Route path='/D3js' component={D3} />
        </Switch>
    </BrowserRouter>
)

export default Router