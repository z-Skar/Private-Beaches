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
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT BILL_ID AS 'Pagamento-ID', 
               RESERVATION_ID AS 'Reserva-ID', 
               CREDIT_CARD_NUMBER AS 'Número de Cartão de Crédito', 
               BILL_COST AS 'Pagamento Total' 
        FROM BILLS
    `;

    const queryParams = [];

    if (searchTerm) {
        const searchColumns = [
            "BILL_COST",
        ];
        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    }

    SQL += ` ORDER BY BILL_ID DESC`;
    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            const CREDIT_CARD_NUMBER = 'Número de Cartão de Crédito';
            const BILL_COST = 'Pagamento Total';
            data = data.map((record) => ({
                ...record,
                [CREDIT_CARD_NUMBER]: CensorField(record[CREDIT_CARD_NUMBER]),
                [BILL_COST]: record[BILL_COST] + '€'
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send('ID inválido.')
    };

    const SQL = `DELETE FROM Bills WHERE BILL_ID = ?`;

    DATABASE.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json({success: 'Registo eliminado com sucesso.'});
    });
});

ROUTER.get('/cost', (req, res) => {
	const SQL = `SELECT MIN(BILL_COST) AS MIN_VALUE,
						MAX(BILL_COST) AS MAX_VALUE
						FROM BILLS`;
	DATABASE.query(SQL, (err, data) => {
		if (err) {
			console.error("Erro ao buscar valores de pagamento:", err);
			return res.status(500).json({ error: "Erro ao buscar valores de pagamento." });
		}
		res.json(data);
	});
});

module.exports = ROUTER;