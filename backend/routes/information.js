const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection')

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT '
              + '(SELECT COUNT(CLIENT_ID) FROM Clients) AS NUMBER_OF_CLIENTS, '
              + '(SELECT COUNT(BEACH_ID) FROM Beaches) AS NUMBER_OF_BEACHES, '
              + '(SELECT COUNT(DISTINCT(COUNTRY_LOCATION)) FROM Beaches) AS NUMBER_OF_COUNTRIES, '
              + '(SELECT COUNT(LIFEGUARD_ID) FROM Lifeguards) AS NUMBER_OF_LIFEGUARDS'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;

