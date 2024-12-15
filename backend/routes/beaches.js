const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection')

ROUTER.get('/', (req, res) => {
    const ORDER_PARAMETER = req.query.orderBy || 'Evaluations.SCORE';
    const ORDER_DIRECTION = req.query.orderDirection || 'DESC';

    const ALLOWED_ORDER_PARAMETERS = ['Evaluations.SCORE', 'Beaches.BEACH_ID'];
    const ALLOWED_ORDER_DIRECTION = ['DESC', 'ASC'];

    if (!ALLOWED_ORDER_PARAMETERS.includes(ORDER_PARAMETER) || !ALLOWED_ORDER_DIRECTION.includes(ORDER_DIRECTION)) {
        return res.status(400).json({erro: 'Parâmetros inválidos.'});
    };

    const SQL = `SELECT BEACH_NAME, BEACH_NAME, CITY_LOCATION, COUNTRY_LOCATION, RESERVATION_COST, DESCRIPTION, 
                 AVG(Evaluations.SCORE) AS SCORE, COUNT(Evaluations.BEACH_ID) AS EVALUATIONS, PICTURE FROM Beaches 
                 INNER JOIN Evaluations ON beaches.BEACH_ID = Evaluations.BEACH_ID 
                 WHERE BEACH_NAME LIKE ? OR DESCRIPTION LIKE ?
                 GROUP BY Beaches.BEACH_ID  
                 ORDER BY ${ORDER_PARAMETER} ${ORDER_DIRECTION}`
    
    let filterText = req.query.textParameter || '';
    filterText = `%${filterText}%`

    DATABASE.query(SQL, [filterText, filterText], (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/luxury', (req, res) => {
    const SQL = 'SELECT BEACH_NAME, RESERVATION_COST, SERVICE_TYPE, COUNTRY_LOCATION, PICTURE FROM BEACHES '
              + 'ORDER BY RESERVATION_COST DESC LIMIT 2';
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;