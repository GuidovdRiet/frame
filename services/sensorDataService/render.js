const d3 = require('d3');
const { saturateZeroOne } = require('../../helpers/saturateValues');
const { getRandomInt } = require('../../helpers/randomValueInRange');
require('../../helpers/range');

const tau = 2 * Math.PI;
const { ringsSpacing, ringsRadius, ringsWidth } = {
    ringsSpacing: 13,
    ringsRadius: 130,
    ringsWidth: 2
};
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

const render = () => {
    const el = document.querySelector('.tracking-results__arc');

    if (!el) return;

    const node = getSVGNode(el);
    const circle = createCircle(node);

    [...2].forEach((range, i) => {
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

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') render();
};
