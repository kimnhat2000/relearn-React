import React from 'react';
import * as d3 from "d3";
import { Link } from 'react-router-dom';

import D3Execise from './D3Exercise';

class D3 extends React.Component{

    componentDidMount = () => {
        this.starD3();
    };

    starD3 = () => {
        // input data
        d3.json('/data/buildings.json').then((data) => {
            data.forEach((d) => {
                d.height = +d.height
            })
            const scaleBrandDomain = data.map((d) => (d.name));

            // set size of canvas
            const margin = { left: 150, right: 10, top: 10, bottom: 150 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            // draw canvas
            const group = d3.select('.exercise1')
                .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

            // x label
            group.append('text')
                .attr('class', 'x axis-label')
                .attr('x', width / 2)
                .attr('y', height + 130)
                .attr('font-size', '20px')
                .attr('text-anchor', 'middle')
                .text("the world's tallest buildings");

            // y label
            group.append('text')
                .attr('class', 'y axis-0label')
                .attr('x', -(height / 2))
                .attr('y', -60)
                .attr('font-size', '20px')
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(-90)')
                .text("height (m)");

            // start scaling our chart
            // const minYValue = d3.min(data, (data) => (data.height))
            const maxYValue = d3.max(data, (data) => (data.height))

            // horizontal scaling
            const scaleX = d3.scaleBand()
                .domain(scaleBrandDomain)
                .range([0, width])
                .paddingInner(0.3)
                .paddingOuter(0.3)

            //  vertical scaling
            const scaleY = d3.scaleLinear()
                .domain([0, maxYValue])
                .range([height, 0])

            // draw axes and ticks
            // create axis
            const XAxis = d3.axisBottom(scaleX);
            // inside of reac group, we create a group for our axis
            group.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0, ${height})`)
                .call(XAxis)
                .selectAll('text') //select all the text we create from svg in this XAxis
                    .attr('y', '10')
                    .attr('x', '-5')
                    .attr('text-anchor', 'end')
                    .attr('transform', 'rotate(-40)');

            const YAxis = d3.axisLeft(scaleY)
                .ticks(3)
                .tickFormat((d) => (d + 'm'))
            group.append('g')
                .attr('class', 'y-axis')
                .call(YAxis);

            // we have our group, now use our group instead of the whole svg canvas
            let rect = group.selectAll('rect')
                .data(data)

            // start drawing all the rect
            rect.enter()
                .append('rect')
                    .attr('x', (data) => (scaleX(data.name)))
                    .attr('y', (data) => (scaleY(data.height)))
                    .attr('width', scaleX.bandwidth)
                    .attr('height', (data) => (height - scaleY(data.height)))
                    .attr('fill', 'gray')
        }).catch((error) => {
            console.log(error)
        });
    }
    render(){
        return(
            <div className='button'>
                <Link to='/' style={{ textDecoration: 'none' }}><button>return to app hall</button></Link>
                <div className='exercise1'></div>
                <D3Execise/>
            </div>
        )
    }
}

export default D3;