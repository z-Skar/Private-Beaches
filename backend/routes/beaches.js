const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection')

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT BEACH_NAME, CITY_LOCATION, COUNTRY_LOCATION, RESERVATION_COST, DESCRIPTION, SERVICE_TYPE, Evaluations.SCORE, PICTURE FROM Beaches '
              + 'INNER JOIN Evaluations ON beaches.BEACH_ID = Evaluations.BEACH_ID '
              + 'ORDER BY Evaluations.SCORE DESC';
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;