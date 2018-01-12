const fs = require('fs');

exports.dump = obj => JSON.stringify(obj, null, 2);

// convert timestamp
exports.moment = require('moment');

// insert an SVG
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Site details
exports.siteName = 'Frame';

// Site menu
exports.menu = [
    { slug: '/', title: 'Home' },
    { slug: '/ideas/add', title: 'Add Idea' },
    { slug: '/create', title: 'Create Account' },
    { slug: '/login', title: 'Login' }
];
