const EXPRESS = require('express');
const ROUTER = EXPRESS.Router(); //
const DATABASE = require('../database/db-connection')

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM evaluations;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT EVALUATION_ID, Clients.FULL_NAME, Beaches.BEACH_NAME, SCORE 
                 FROM Evaluations
                 INNER JOIN Clients ON Evaluations.CLIENT_ID = Clients.CLIENT_ID 
                 INNER JOIN Beaches ON Evaluations.BEACH_ID = Beaches.BEACH_ID 
                 ORDER BY EVALUATION_ID DESC;`
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;