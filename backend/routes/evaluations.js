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
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT EVALUATION_ID, Clients.FULL_NAME, COALESCE(Beaches.BEACH_NAME, '[N/A]') AS BEACH_NAME, SCORE 
        FROM Evaluations
        INNER JOIN Clients ON Evaluations.CLIENT_ID = Clients.CLIENT_ID 
        LEFT JOIN Beaches ON Evaluations.BEACH_ID = Beaches.BEACH_ID
    `;

    const queryParams = [];

    if (searchTerm) {
        const searchColumns = [
            "Clients.FULL_NAME",
            "Beaches.BEACH_NAME",
            "SCORE"
        ];
        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    }

    SQL += ` ORDER BY EVALUATION_ID DESC`;
    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send('ID inválido.')
    };

    const SQL = `DELETE FROM Evaluations WHERE EVALUATION_ID = ?`;

    DATABASE.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json({success: 'Registo eliminado com sucesso.'});
    });
});

module.exports = ROUTER;