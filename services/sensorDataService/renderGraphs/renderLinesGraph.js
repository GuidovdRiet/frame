const d3 = require('d3');
const { saturateZeroOne } = require('../../../helpers/saturateValues');
const { getRandomInt } = require('../../../helpers/randomValueInRange');
const renderGraph = require('./renderGraph');

const colors = [
    'rgb(146, 178, 233)',
    'rgb(69, 183, 195)',
    'rgb(249, 119, 133)'
];

//TODO: Pass data from?
const renderLinesGraph = el => {
    const totalHeight = el.getBoundingClientRect().height;

    // node.append()
    // const totalHeight = node.getBoundingClientR

    renderGraph((range, i) => {
        d3
            .select(el)
            .append('div')
            .style('background-color', colors[i])
            .style('width', '5px')
            .style('height', `${getRandomInt(1, totalHeight)}px`);
    });
};

module.exports = renderLinesGraph;
