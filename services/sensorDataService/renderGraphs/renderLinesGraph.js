const d3 = require('d3');
const { saturateZeroOne } = require('../../../helpers/saturateValues');
const { getRandomInt } = require('../../../helpers/randomValueInRange');
const renderGraph = require('./renderGraph');

const colors = ['rgb(27, 30, 128)', 'rgb(69, 183, 195)', 'rgb(249, 119, 133)'];

//TODO: Pass data from?
const renderLinesGraph = node => {
    renderGraph((range, i) => {});
};

module.exports = renderLinesGraph;
