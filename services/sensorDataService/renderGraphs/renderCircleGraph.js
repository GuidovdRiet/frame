const d3 = require('d3');
const { saturateZeroOne } = require('../../../helpers/saturateValues');
const { getRandomInt } = require('../../../helpers/randomValueInRange');

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
const renderCircleGraph = (el, gsrMedior, pulseMedior, gsrMax, pulseMax) => {
    const circle = createCircle(d3.select(el));

    const innerRadiusGSR = ringsRadius - 0 * ringsSpacing;
    const outerRadiusGSR = ringsRadius + ringsWidth - 0 * ringsSpacing;
    createBackground(circle, innerRadiusGSR, outerRadiusGSR);
    createForeground(
        circle,
        saturateZeroOne(0, gsrMax, gsrMedior),
        colors[0],
        innerRadiusGSR,
        outerRadiusGSR
    );

    const innerRadiusPulse = ringsRadius - 1 * ringsSpacing;
    const outerRadiusPulse = ringsRadius + ringsWidth - 1 * ringsSpacing;
    createBackground(circle, innerRadiusPulse, outerRadiusPulse);
    createForeground(
        circle,
        saturateZeroOne(0, pulseMax, pulseMedior),
        colors[1],
        innerRadiusPulse,
        outerRadiusPulse
    );
};

module.exports = renderCircleGraph;
