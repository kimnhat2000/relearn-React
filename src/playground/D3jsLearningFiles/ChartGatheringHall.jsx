import React from 'react';
import { Link } from 'react-router-dom';
import D3FirstChart from './D3Exercise';
import D3Exercise from './D3Exercise';
import D3Exercise2 from './D3Exercise2';

class ChartGatheringHall extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstChart: false,
            secondChart: false,
            thirdChart: true,
        }
    }

    onFirstChartClick = () => {
        this.setState({ firstChart: !this.state.firstChart })
    };

    onSecondChartClick = () => {
        this.setState({ secondChart: !this.state.secondChart })
    };

    onThirdChartClick = () => {
        this.setState({ thirdChart: !this.state.thirdChart })
    };

    render(){
        const { firstChart, secondChart, thirdChart } = this.state;
        return (
            <div>
                <div>
                    <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                    <button onClick={this.onFirstChartClick}>first chart</button>
                    <button onClick={this.onSecondChartClick}>second chart</button>
                    <button onClick={this.onThirdChartClick}>third chart</button>
                </div>
                { firstChart &&
                    <D3FirstChart />
                }
                { secondChart &&
                    <D3Exercise />
                }
                { thirdChart &&
                    <D3Exercise2 />
                }        
            </div>
        )
    }
}

export default ChartGatheringHall;