import React from 'react';
import * as d3 from 'd3';

class D3Exercise2 extends React.Component {

    componentDidMount = () => {
        this.startD3();
    };

    startD3 = () => {

        let dataIndex = 0;

        d3.json('/data/data.json').then((data) => {
            // reselect data
            const newData = data.map(d => d.countries
                .filter((c) => c.income && c.life_exp)
                .map((c) => {
                    c.income = +c.income;
                    c.life_exp = +c.life_exp
                    return c;
                })
            )

            newData.map(d => (console.log(d.population)))

            d3.interval(() => {
                dataIndex = (dataIndex < 214) ? dataIndex + 1 : 0;
                update(newData[dataIndex])
            },100)

            update(newData[0])
        }).catch((error) => {
            console.log(error);
        });
        // draw canvas
        // canvas size and margin
        const margin = { left: 150, right: 10, top: 10, bottom: 150 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        // canvas
        const canvas = d3.select('.exercise2')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g');

        // SCALING
        // X scaling
        const XScale = d3.scaleLog()
            .base(10)
            .range([0, width])
            .domain([142, 150000]);

        // Y scaling
        const YScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 90]);
        
        // circle radius scaling
        const Rcircle = d3.scaleLinear()
            .range([25 * Math.PI, 1500 * Math.PI])
            .domain([2000, 1400000000]);
        
        // color scaling
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const update = (data) => {
            var tr = d3.transition()
                .duration(100);
            // input data to circle
            const circles = canvas.selectAll('circle')
                .data(data, (d) => (d.country))

            circles.exit()
                .attr('class', 'exit')
                .remove();

            // draw circles
            circles.enter()
                .append('circle')
                .attr("class", "enter")
                .attr('fill', (data) => (colorScale(data.continent)))
                .merge(circles)
                .transition(tr)
                .attr('cx', (data) => (XScale(data.income)))
                .attr('cy', (data) => (YScale(data.life_exp)))
                .attr('r', (data) => (Math.sqrt(Rcircle(data.population) / Math.PI)));
        }
    }
    
    render(){
        return(
            <div className='exercise2'/>
        )
    }
}

export default D3Exercise2;
