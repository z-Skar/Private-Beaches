const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection')

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM reservations;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT RESERVATION_ID, Clients.FULL_NAME, Beaches.BEACH_NAME, 
                 RESERVATION_END, RESERVATION_START 
                 FROM Reservations 
                 INNER JOIN Clients ON Reservations.CLIENT_ID = Clients.CLIENT_ID 
                 INNER JOIN Beaches ON Reservations.BEACH_ID = Beaches.BEACH_ID 
                 ORDER BY RESERVATION_ID DESC`;

    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = data.map(record => ({
                ...record,
                RESERVATION_START: record.RESERVATION_START.toISOString().split('T')[0],
                RESERVATION_END: record.RESERVATION_END.toISOString().split('T')[0]
            }));
            return res.status(200).json(data);
        };
    });
});

module.exports = ROUTER;