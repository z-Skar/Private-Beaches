const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT 
                    (SELECT COUNT(Client_ID) FROM Clients) AS 'Número de Clientes',
                    (SELECT SUM(BILL_COST) FROM BILLS) AS 'Lucro Total',
                    (SELECT COUNT(Lifeguard_ID) FROM Lifeguards WHERE Status = 'EM ESPERA') AS 'Salva-vidas pendentes',
                    (SELECT COUNT(Beach_ID) FROM Beaches) AS 'Número de Praias',
                    (SELECT COUNT(Lifeguard_ID) FROM Lifeguards WHERE Status = 'Aceite') AS 'Número de Salva-vidas',
                    (SELECT COUNT(Beach_ID) FROM Beaches WHERE Lifeguard_ID IS NULL) AS 'Praias sem Salva-vidas',
                    (SELECT COUNT(Reservation_ID) FROM RESERVATIONS WHERE RESERVATION_START <= LAST_DAY(CURDATE()) AND RESERVATION_END >= DATE_FORMAT(CURDATE(), '%Y-%m-01')) AS 'Reservas Mensais',
                    (SELECT BILL_COST FROM BILLS ORDER BY BILL_ID DESC LIMIT 1) AS 'Último pagamento',
                    (SELECT SCORE FROM EVALUATIONS ORDER BY EVALUATION_ID DESC LIMIT 1) AS 'Última avaliação'`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            BILL_COST = 'Lucro Total';
            LAST_PAYMENT = 'Último pagamento';
            LAST_EVALUATION = 'Última avaliação';
            data = data.map((record) => ({
                ...record,
                [BILL_COST]: record[BILL_COST] + '€',
                [LAST_PAYMENT]: record[LAST_PAYMENT] + '€',
                [LAST_EVALUATION]: record[LAST_EVALUATION] + '★',
            }));
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;