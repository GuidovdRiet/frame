const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
    getRandomArbitrary,
    getRandomInt
};
