const EXPRESS = require('express');
const ROUTER = EXPRESS.Router(); //
const DATABASE = require('../database/db-connection')

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM beaches;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;