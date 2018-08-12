import React from 'react';
import * as d3 from 'd3';

class D3Execise extends React.Component{

    componentDidMount = () => {
        this.startD3Exercise()
    }

    startD3Exercise = () => {
        // import data
        d3.json('/data/revenues.json').then((data) => {
            // turn string to number
            data.forEach((d) => (
                d.revenue = +d.revenue
            ))

        // set size and margin of the canvas
        const margin = { left: 150, right: 10, top:10, bottom:50 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // create canvas
        const svg = d3.select('.exercise')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // X scaling
        const xDomainAxisData = data.map((d) => (d.month));
        const scaleX = d3.scaleBand()
            .domain(xDomainAxisData)
            .range([0,width])
            .paddingInner(0.3)
            .paddingOuter(0.3);

        // Y scaling
            // max data number
        const maxYValue = d3.max(data, (data) => (data.revenue));
        const scaleY = d3.scaleLinear()
            .domain([0, maxYValue])
            .range([height, 0]);

        // draw axes and ticks
        // create X axis
        const XAxis = d3.axisBottom(scaleX);
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(XAxis)
            .selectAll('text')
                .attr('y', '10')
                .attr('x', '0')
                .attr('text-anchor', 'middle');
        // create Y axis
        const YAxis = d3.axisLeft(scaleY)
            .tickFormat((d) => ('$' + d))
        svg.append('g')
            .attr('class', 'y-axis')
            .call(YAxis);

        // input data to all rect
        const rect = svg.selectAll('rect')
            .data(data);

        // draw all rects
        rect.enter()
            .append('rect')
                .attr('x', (data) => (scaleX(data.month)))
                .attr('y', (data) => (scaleY(data.revenue)))
                .attr('width', scaleX.bandwidth)
                .attr('height', (data) => (height - scaleY(data.revenue)))
                .attr('fill', 'rgb(150, 150, 150)');
        
        // x label
        svg.append('text')
            .attr('class', 'x axis-label')
            .attr('x', width / 2)
            .attr('y', height + 50)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .text("Month");

        //  y label
        svg.append('text')
            .attr('class', 'y axis-0label')
            .attr('x', -(height / 2))
            .attr('y', -60)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text("revenue");

        }).catch((error) => {
            console.log(error);
        });

    }

    render(){
        return(
            <div className='exercise'></div>
        )
    }
}

export default D3Execise;