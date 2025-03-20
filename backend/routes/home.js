const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT 
                    (SELECT COUNT(Client_ID) FROM Clients) AS 'Número de Clientes',
                    (SELECT SUM(BILL_COST) FROM BILLS) AS 'Lucro Total',
                    (SELECT COUNT(Lifeguard_ID) FROM Lifeguards WHERE Status = 'Por Avaliar') AS 'Salva-vidas pendentes'`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            BILL_COST = 'Lucro Total';
            data = data.map((record) => ({
                ...record,
                [BILL_COST]: record[BILL_COST] + '€'
            }));
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;