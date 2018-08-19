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
            data.forEach((d) => {
                d.revenue = +d.revenue;
                d.profit = +d.profit
            })
            d3.interval(() => {
                const newData = flag ? data : data.slice(1);
                update(newData);
                flag = !flag;
            }, 1000);

            update(data); // this is to call update function so axes will be render immediatley without waiting for 1 second

        }).catch((error) => {
            console.log(error);
        });

        let flag = true;

        // set size and margin of the canvas
        const margin = { left: 150, right: 10, top: 10, bottom: 50 };
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
        const scaleX = d3.scaleBand()
            .range([0, width])
            .paddingInner(0.3)
            .paddingOuter(0.3);

        // Y scaling
        const scaleY = d3.scaleLinear()
            .range([height, 0]);

        // draw X axis group
        const XAxisGroup = svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)

        // draw Y axis group
        const YAxisGroup = svg.append('g')
            .attr('class', 'y-axis')

        // x label
        svg.append('text')
            .attr('class', 'x axis-label')
            .attr('x', width / 2)
            .attr('y', height + 50)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .text("Month");

        //  y label
        const YLabel = svg.append('text')
            .attr('class', 'y axis-0label')
            .attr('x', -(height / 2))
            .attr('y', -60)
            .attr('font-size', '20px')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text("revenue");        

        const update = (data) => {
            const tr = d3.transition().duration(750) // duration time should alwaus lower than update time
            const value = flag ? 'revenue' : 'profit';
            // X scaling data provide
            const xDomainAxisData = data.map((d) => (d.month));
            // max data number
            const maxYValue = d3.max(data, (data) => (data[value]));

            scaleX.domain(xDomainAxisData)
            scaleY.domain([0, maxYValue])

            // draw axes and ticks
            // create X axis
            const XAxis = d3.axisBottom(scaleX);
            XAxisGroup.transition(tr).call(XAxis); // call transition here to see X move
            // create Y axis
            const YAxis = d3.axisLeft(scaleY)
                .tickFormat((d) => ('$' + d))
            YAxisGroup.transition(tr).call(YAxis); // call transition here to see Y move

            // DATA JOIN
            // input data to all rect, at thi point our enter array is full and ready
            const rect = svg.selectAll('rect')
                .data(data, (d) => (d.month));
            
            // before EXIT, remove all current elemtents on screen (before drawing update, we must remove whatever on screen first so they will not overlapse)
            rect.exit()
                .attr('fill', 'red')
                .transition(tr)
                    .attr('y', scaleY(0))
                    .attr('height', 0)
                    .remove();

            // finally we can use ENTER enter() to draw our rects
            // draw all rects
                rect.enter(d3.transition().duration(500))
                .append('rect')
                    .attr('x', (data) => (scaleX(data.month)))
                    .attr('y', scaleY(0)) //start at the bottm
                    .attr('width', scaleX.bandwidth)
                    .attr('height', 0) //with 0 height
                    .attr('fill', 'rgb(150, 150, 150)')
                    .merge(rect) // merge UPDATE and ENTER
                    .transition(tr)
                        .attr('y', (data) => (scaleY(data[value])))
                        .attr('height', (data) => (height - scaleY(data[value])))
                        .attr('x', (data) => (scaleX(data.month)))
                        .attr('width', scaleX.bandwidth)()

            const label = flag ? 'revenue' : 'profit';
            YLabel.text(label);
        }
    }

    render(){
        return(
            <div className='exercise'></div>
        )
    }
}

export default D3Execise;