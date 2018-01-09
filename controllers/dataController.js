const { fetchData } = require('../services/sensorDataService');

const fetch = async (req, res) => {
    const data = await fetchData(req.session.user.id);

    return res.json({ data });
};
