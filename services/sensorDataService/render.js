const d3 = require('d3');
require('../../helpers/range');

const tau = 2 * Math.PI;

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
            `translate(${parseFloat(container.style('width')) / 2}, 200)`
        );

const createBackground = (circle, ...radius) =>
    circle
        .append('path')
        .datum({ endAngle: tau })
        .attr('d', createArc(...radius));

const createForeground = (circle, value, ...radius) =>
    circle
        .append('path')
        .datum({ endAngle: value * tau })
        .attr('d', createArc(...radius));

const render = () => {
    const el = document.querySelector('.tracking-results__arc');

    if (!el) return;

    const node = getSVGNode(el);
    const circle = createCircle(node);

    [...3].forEach(i => {
        createBackground(circle, 190 - i * 3, 192 - i * 3);
    });

    // createForeground(circle, saturateValue());
};

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') render();
};
