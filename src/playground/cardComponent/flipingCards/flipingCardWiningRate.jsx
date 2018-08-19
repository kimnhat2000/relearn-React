import React from 'react';
import * as d3 from 'd3';

class FlipingCardWiningRate extends React.Component {

    componentDidMount = () => {
        this.startD3();
    };

    startD3 = () => {
        let data = this.props.data
        this.componentWillReceiveProps = () => {
            data = this.props.data
        }
        d3.interval(() => {
            update(data);
        }, 500)
        const margin = { left: 70, right: 20, top: 10, bottom: 80 }
        const width = 500 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // draw svg
        const svg = d3.select('.win-lose-chart').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        
        // draw labels
        // x label
        svg.append('text')
            .attr('class', 'x axis-label')
            .attr('x', width / 2)
            .attr('y', height + 50)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .text("number of cards");

        // y label
        svg.append('text')
            .attr('class', 'y axis-0label')
            .attr('x', -(height / 2))
            .attr('y', -50)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text("number of wins/loses");
        
        // scale Y
        const Yscale = d3.scaleLinear()
            .range([height, 0]);

        // scale X

        const Xscale = d3.scaleBand()

            .range([0, width])
            .paddingInner(0.3)
            .paddingOuter(0.3);

        // axes and ticks
        // create X axis
       
        const XAxisGroup = svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
    
        // create Y axis   
        const YAxisGroup = svg.append('g')
            .attr('class', 'y-axis')

        const update = (data) => {
            const tr = d3.transition().duration(400)
            // x scaling update
            const Xdata = data.map(d => (d.cardsNumber));
            Xscale.domain(Xdata);

            // Y scaling update
            const maxWin = d3.max(data, data => (data.wins));
            const maxLose = d3.max(data, data => (data.lose));
            const max = Math.max(maxWin, maxLose);
            Yscale.domain([0, max]);

            // axes update
            const XAxis = d3.axisBottom(Xscale);
            XAxisGroup.transition(tr).call(XAxis);
            const YAxis = d3.axisLeft(Yscale)
                .ticks(5)
            YAxisGroup.transition(tr).call(YAxis);

            // DATA JOIN
            // input data to all rect, at thi point our enter array is full and ready
            // give data for rects
            const winningRects = svg.selectAll('.winning')
                .data(data);
            
            const losingRects = svg.selectAll('.losing')
                .data(data)

            winningRects.exit()
                .transition(tr)
                .remove();
            
            losingRects.exit()
                .transition(tr)
                .remove();

            // draw winning rects
            winningRects.enter(d3.transition().duration(400))
                .append('rect')
                .attr('class', 'winning')
                .attr('x', data => (Xscale(data.cardsNumber)))
                .attr('y', data => (Yscale(data.wins)))
                .attr('width', Xscale.bandwidth)
                .attr('height', data => (height - Yscale(data.wins)))
                .attr('fill', 'gray')
                .merge(winningRects)
                .transition(tr)
                    .attr('y', data => (Yscale(data.wins)))
                    .attr('height', data => (height - Yscale(data.wins)))
                    .attr('x', data => (Xscale(data.cardsNumber)))
                    .attr('width', Xscale.bandwidth)

            // draw losing rects
            losingRects.enter(d3.transition().duration(400))
                .append('rect')
                .attr('class', 'losing')
                .attr('x', data => (Xscale(data.cardsNumber)+20))
                .attr('y', data => (Yscale(data.lose)))
                .attr('width', Xscale.bandwidth)
                .attr('height', data => (height - Yscale(data.lose)))
                .attr('fill', 'red')
                .merge(losingRects)
                    .transition(tr)
                    .attr('y', data => (Yscale(data.lose)))
                    .attr('height', data => (height - Yscale(data.lose)))
                    .attr('x', data => (Xscale(data.cardsNumber)+20))
                    .attr('width', Xscale.bandwidth)
        }
    }

    render(){
        return(
            <div className='win-lose-chart'>
                
            </div>
        )
    }
}

export default FlipingCardWiningRate;