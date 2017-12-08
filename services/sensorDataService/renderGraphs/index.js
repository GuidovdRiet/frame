const d3 = require('d3');
const renderCircleGraph = require('./renderCircleGraph');
const renderLinesGraph = require('./renderLinesGraph');

const getSVGNode = el => d3.select(el);
const initGraph = (el, fn) => (el ? fn(el) : false);

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        initGraph(
            getSVGNode(document.querySelector('.tracking-results__arc')),
            renderCircleGraph
        );
        // initGraph(
        //     document.querySelector('.tracking-results__lines'),
        //     renderLinesGraph
        // );
    }
};
