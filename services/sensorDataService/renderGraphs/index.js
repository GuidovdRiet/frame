const renderCircleGraph = require('./renderCircleGraph');
const renderLinesGraph = require('./renderLinesGraph');
const axios = require('axios');
const initGraph = (el, fn, ...args) => (el ? fn(el, ...args) : false);

document.onreadystatechange = async () => {
    if (document.readyState == 'interactive') {
        const indexEl = document.querySelector('.tracking-results');

        if (!indexEl) return;

        const index = indexEl.getAttribute('data-index');
        const res = await fetch(`/fetch-data/${index}`);
        const { data } = await res.json();

        const gsrTotal = data.reduce((accumulator, data, index, array) => {
            if (data.type === 'GSR') return accumulator + data.value;
        }, 0);
        const gsrData = data.filter(d => d.type === 'GSR');
        const gsrMedior = gsrTotal / gsrData.length;
        const gsrMax = Math.max.apply(Math, gsrData.map(d => d.value));

        const pulseTotal = data.reduce((accumulator, data, index, array) => {
            if (data.type === 'Pulse') return accumulator + data.value;
        }, 0);
        const pulseData = data.filter(d => d.type === 'Pulse');
        const pulseMedior = pulseTotal / pulseData.length;
        const pulseMax = Math.max.apply(Math, pulseData.map(d => d.value));

        initGraph(
            document.querySelector('.tracking-results__arc'),
            renderCircleGraph,
            gsrMedior,
            pulseMedior,
            gsrMax,
            pulseMax
        );
        initGraph(
            document.querySelector('.tracking-results__lines'),
            renderLinesGraph,
            gsrMedior,
            pulseMedior,
            gsrMax,
            pulseMax
        );
    }
};
