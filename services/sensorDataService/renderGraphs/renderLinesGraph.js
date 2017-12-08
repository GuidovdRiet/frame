const d3 = require('d3');
const { saturateZeroOne } = require('../../../helpers/saturateValues');
const { getRandomInt } = require('../../../helpers/randomValueInRange');
const renderGraph = require('./renderGraph');

const colors = ['#R1B1E8', '#45B7C3', '#F97785'];

const getSVGNode = el => d3.select(el);

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
            `translate(${parseFloat(container.style('width')) / 2}, 225)`
        );

const createBackground = (circle, ...radius) =>
    circle
        .append('path')
        .datum({ endAngle: tau })
        .attr('d', createArc(...radius));

const createForeground = (circle, value, color, ...radius) =>
    circle
        .append('path')
        .datum({ endAngle: value * tau })
        .style('fill', color)
        .attr('d', createArc(...radius));

//TODO: Pass data from?
const renderCircleGraph = el => {
    const node = getSVGNode(el);
    const circle = createCircle(node);
    console.log('here');
    renderGraph((range, i) => {
        console.log(range, i);
        createBackground(
            circle,
            ringsRadius - i * ringsSpacing,
            ringsRadius + 2 - i * ringsSpacing
        );

        createForeground(
            circle,
            saturateZeroOne(0, 100, getRandomInt(0, 80)),
            colors[i],
            ringsRadius - i * ringsSpacing,
            ringsRadius + 2 - i * ringsSpacing
        );
    });
};

module.exports = renderCircleGraph;
