const renderCircleGraph = require('./renderCircleGraph');
const renderLinesGraph = require('./renderLinesGraph');

const initGraph = (el, fn) => (el ? fn(el) : false);

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        initGraph(
            document.querySelector('.tracking-results__arc'),
            renderCircleGraph
        );
        initGraph(
            document.querySelector('.tracking-results__lines'),
            renderLinesGraph
        );
    }
};
