import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery'; 
import './d3style.css';

class D3Exercise2 extends React.Component {

    componentDidMount = () => {
        this.startD3();
    };

    startD3 = () => {
        let newData;
        let run;
        // input data
        let index = 0;
        d3.json('/data/data.json').then((data) => {
            newData = data.map(d => d.countries.filter(c => (c.income && c.life_exp)))
            update(newData[index]);
        }).catch((error) => {
            console.log(error)
        });

        $('.play').on('click', function () {
            const button = $(this);
            if (button.text() === 'play') {
                button.text('pause');
                run = setInterval(chartProcess, 100);
            } else {
                button.text('play');
                clearInterval(run);
            }
        })

        $('.reset').on('click', () => {
            index = 0;
            update(newData[index]);
        })

        $('.continent-select').on('change', () => {
            update(newData[index]);
        })

        const chartProcess = () => {
            index = index < 214 ? index + 1 : 0;
            update(newData[index]);
        }

        // decide margin of canvas
        const margin = { left: 80, right: 20, top: 50, bottom: 100 },
            height = 500 - margin.top - margin.bottom,
            width = 800 - margin.left - margin.right;

        // draw canvas
        const canvas = d3.select('.exercise2')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // SCALING
        // X scale
        const XScale = d3.scaleLog()
            .base(10)
            .range([0, width])
            .domain([142, 150000]);
        // Y scale
        const YScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 90]);
        // circles' radius scale
        const RScale = d3.scaleLinear()
            .range([25 * Math.PI, 1500 * Math.PI])
            .domain([2000, 1400000000]);
        // color scale
        const colorScale = d3.scaleOrdinal(d3.schemeSet3);

        // draw axes
        // X axis
        const XAxis = d3.axisBottom(XScale)
            .tickValues([400, 4000, 40000])
            .tickFormat(d3.format('$'));
        canvas.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(XAxis);
        // Y axis
        const YAxis = d3.axisLeft(YScale)
            .tickFormat(d => (+d));
        canvas.append('g')
            .attr('class', 'y-axis')
            .call(YAxis);

        // Labels
        canvas.append("text")
            .attr("y", height + 50)
            .attr("x", width / 2)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("GDP Per Capita ($)");
        canvas.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -170)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("Life Expectancy (Years)")
        var timeLabel = canvas.append("text")
            .attr("y", height - 10)
            .attr("x", width - 40)
            .attr("font-size", "40px")
            .attr("opacity", "0.4")
            .attr("text-anchor", "middle")
            .text("1800");

        // update function
        const update = (data) => {
            const tr = d3.transition()
                .duration(100);

            const continent = $('.continent-select').val().toLowerCase();

            data = data.filter(d => (continent === 'all' ? d : d.continent === continent))
            
            // enter data to circle group
            const circles = canvas.selectAll('circle')
                .data(data, (data => (data.country)));
            
            circles.exit()
                .attr('class', 'exit')
                .remove();

            // draw the group of circles
            circles.enter()
                .append('circle')
                .attr("class", "enter")
                    .attr('fill', (d) => (colorScale(d.continent)))
                    .merge(circles)
                        .transition(tr)
                        .attr('cx', (d) => (XScale(d.income)))
                        .attr('cy', (d) => (YScale(d.life_exp)))
                        .attr('r', (d) => (Math.sqrt(RScale(d.population))));
            // Update the time label
            timeLabel.text(+(index + 1800))            
        };
    }

    render() {
        return(
            <div>
                <button className='play'>play</button>
                <button className='reset'>reset</button>
                <div>
                    <select className="continent-select">
                        <option value='all'>All</option>
                        <option value='Europe'>Europe</option>
                        <option value='Asia'>Asia</option>
                        <option value='Americas'>Americas</option>
                        <option value='Africa'>Africa</option>
                    </select>
                </div>
                <div className='exercise2'/>
            </div>
        )
    }
}

export default D3Exercise2;