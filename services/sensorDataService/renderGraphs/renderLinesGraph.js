const d3 = require('d3');
const {
    saturateZeroOne,
    saturatePercentage
} = require('../../../helpers/saturateValues');
const { getRandomInt } = require('../../../helpers/randomValueInRange');

const colors = [
    'rgb(146, 178, 233)',
    'rgb(69, 183, 195)',
    'rgb(249, 119, 133)'
];

//TODO: Pass data from?
const renderLinesGraph = (el, gsrMedior, pulseMedior, gsrMax, pulseMax) => {
    const totalHeight = el.getBoundingClientRect().height;
    const percentageValGSR = saturatePercentage(0, gsrMax, gsrMedior);
    const percentageValPulse = saturatePercentage(0, pulseMax, pulseMedior);
    const valueGSR = totalHeight / 100 * percentageValGSR;
    const valuePulse = totalHeight / 100 * percentageValPulse;

    d3
        .select(el)
        .append('div')
        .style('background-color', colors[0])
        .style('width', '5px')
        .style('height', `${valueGSR}px`);

    d3
        .select(el)
        .append('div')
        .style('background-color', colors[1])
        .style('width', '5px')
        .style('height', `${valuePulse}px`);
};

module.exports = renderLinesGraph;
