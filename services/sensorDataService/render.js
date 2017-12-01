const d3 = require('d3');

const tau = 2 * Math.PI;

const getSVGNode = el => d3.select(el);

const createArc = (innerRadius, outerRadius) =>
    d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);

const createCircle = container => container.append('g');

const createBackground = circle =>
    circle
        .append('path')
        .datum({ endAngle: tau })
        .attr('d', createArc(19, 26));

const createForeground = (circle, value) =>
    circle
        .append('path')
        .datum({ endAngle: value * tau })
        .attr('d', createArc(19, 26));

const render = () => {
    const node = getSVGNode('.value-node');
    const circle = createCircle();
    node.append(circle);

    createBackground(circle);
    createForeground(circle, saturateValue());
};
