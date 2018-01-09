const d3 = require('d3');
const { saturateZeroOne } = require('../../../helpers/saturateValues');
const { getRandomInt } = require('../../../helpers/randomValueInRange');
const renderGraph = require('./renderGraph');

const tau = 2 * Math.PI;
const { ringsSpacing, ringsRadius, ringsWidth } = {
    ringsSpacing: 15,
    ringsRadius: 130,
    ringsWidth: 4
};
const colors = [
    'rgb(146, 178, 233)',
    'rgb(69, 183, 195)',
    'rgb(249, 119, 133)'
];

const createArc = (innerRadius, outerRadius) =>
    d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);

const createCircle = container =>
    container
        .append('g')
        .attr(
            'transform',
            `translate(${parseFloat(container.style('width')) / 2}, 190)`
        );

const createBackground = (circle, ...radius) =>
    circle
        .append('path')
        .datum({
            endAngle: tau
        })
        .attr('d', createArc(...radius));

const createForeground = (circle, value, color, ...radius) =>
    circle
        .append('path')
        .style('fill', color)
        .datum({
            endAngle: value * tau
        })
        .attr('d', createArc(...radius));

//TODO: Pass data from?
const renderCircleGraph = el => {
    const circle = createCircle(d3.select(el));

    renderGraph((range, i) => {
        const innerRadius = ringsRadius - i * ringsSpacing;
        const outerRadius = ringsRadius + ringsWidth - i * ringsSpacing;

        createBackground(circle, innerRadius, outerRadius);
        createForeground(
            circle,
            saturateZeroOne(0, 100, getRandomInt(0, 80)),
            colors[i],
            innerRadius,
            outerRadius
        );
    });
};

module.exports = renderCircleGraph;
