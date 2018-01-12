// Import scss for webpack compiling
require('../sass/app.scss');
require('../../services/sensorDataService/renderGraphs');

const axios = require('axios');

window.addEventListener('load', () => {
    const followForm = document.querySelector('.user-card__follow-form');
    followForm.addEventListener('submit', (e) => {
        e.preventDefault();
        axios
            .post(e.target.action)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
