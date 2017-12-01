const saturatePercentage = (min, max, value) =>
    (value - min) * 100 / (max - min);

const saturateZeroOne = (min, max, value) =>
    saturatePercentage(min, max, value) / 100;

module.exports = {
    saturatePercentage,
    saturateZeroOne
};
