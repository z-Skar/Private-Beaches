const EXPRESS = require('express');
const ROUTER = EXPRESS.Router(); //
const DATABASE = require('../database/db-connection')

const { CensorField } = require('../util/CensorField');

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM bills;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT BILL_ID, RESERVATION_ID, CREDIT_CARD_NUMBER, BILL_COST 
                 FROM BILLS
                 ORDER BY BILL_ID DESC`;
    
    
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = data.map((record) => ({
                ...record,
                CREDIT_CARD_NUMBER: CensorField(record.CREDIT_CARD_NUMBER),
                BILL_COST: record.BILL_COST + '€'
            }));
            return res.status(200).json(data);
        };
    });
})

module.exports = ROUTER;