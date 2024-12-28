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

    const SQL = `SELECT BEACH_NAME, CITY_LOCATION, COUNTRY_LOCATION, RESERVATION_COST, DESCRIPTION, SERVICE_TYPE, 
                 AVG(Evaluations.SCORE) AS SCORE, COUNT(Evaluations.BEACH_ID) AS EVALUATIONS, PICTURE FROM Beaches 
                 INNER JOIN Evaluations ON beaches.BEACH_ID = Evaluations.BEACH_ID 
                 WHERE (BEACH_NAME LIKE ? OR DESCRIPTION LIKE ?) 
                 AND COUNTRY_LOCATION LIKE ? AND CITY_LOCATION LIKE ? AND SERVICE_TYPE LIKE ? 
                 AND RESERVATION_COST BETWEEN ? AND ? 
                 GROUP BY Beaches.BEACH_ID 
                 ORDER BY ${ORDER_PARAMETER} ${ORDER_DIRECTION}`
    
    const filterText = req.query.textParameter ? `%${req.query.textParameter}%` : '%';
    const selectedCountry = req.query.countryParameter ? `%${req.query.countryParameter}%` : '%';
    const selectedCity = req.query.cityParameter ? `%${req.query.cityParameter}%` : '%';
    const selectedServiceType = req.query.serviceTypeParameter ? `%${req.query.serviceTypeParameter}%` : '%';
    const selectedMinCost = req.query.minCostParameter;
    const selectedMaxCost = req.query.maxCostParameter;

    DATABASE.query(SQL, [filterText, filterText, selectedCountry, selectedCity,
        selectedServiceType, selectedMinCost, selectedMaxCost], (err, data) => {
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

ROUTER.get('/location', (req, res) => {
    const SQL = `SELECT COUNTRY_LOCATION, 
                 GROUP_CONCAT(DISTINCT CITY_LOCATION ORDER BY CITY_LOCATION SEPARATOR ", ") AS CITIES 
                 FROM BEACHES 
                 GROUP BY COUNTRY_LOCATION`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/services', (req, res) => {
    const SQL = `SELECT DISTINCT SERVICE_TYPE FROM BEACHES`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;