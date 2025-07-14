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
        SELECT EVALUATION_ID AS 'Avaliação-ID', 
               Clients.FULL_NAME AS 'Cliente', 
               COALESCE(Beaches.BEACH_NAME, '[N/A]') AS Praia, 
               SCORE AS 'Avaliação' 
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
        } else {
            data = data.map(record => ({
                ...record,
                'Avaliação': record['Avaliação'] + '★'
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

    const SQL = `DELETE FROM Evaluations WHERE EVALUATION_ID = ?`;

    DATABASE.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json({success: 'Registo eliminado com sucesso.'});
    });
});

ROUTER.get(`/client/:clientID/beach/:beachID`, (req, res) => {
    const { clientID, beachID } = req.params;

	const SQL = `SELECT SCORE FROM EVALUATIONS WHERE CLIENT_ID = ? AND BEACH_ID = ? LIMIT 1`;
	DATABASE.query(SQL, [clientID, beachID], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao buscar avaliação.' });
		}
		if (results.length === 0) {
			return res.status(200).json({ SCORE: null });
		}
		return res.status(200).json(results[0]);
	});
});

ROUTER.post('/submit', (req, res) => {
	const { CLIENT_ID, BEACH_ID, SCORE } = req.body;

	if (!CLIENT_ID || !BEACH_ID || typeof SCORE === 'undefined') {
		return res.status(400).json({ error: 'Dados em falta ou inválidos.' });
	}

	const SELECT_SQL = `SELECT * FROM EVALUATIONS WHERE CLIENT_ID = ? AND BEACH_ID = ?`;

	DATABASE.query(SELECT_SQL, [CLIENT_ID, BEACH_ID], (err, results) => {
		if (err) {
			console.error('Erro ao verificar avaliação existente:', err);
			return res.status(500).json({ error: 'Erro interno ao verificar avaliação.' });
		}

		if (results.length > 0) {
			const UPDATE_SQL = `UPDATE EVALUATIONS SET SCORE = ? WHERE CLIENT_ID = ? AND BEACH_ID = ?`;

			DATABASE.query(UPDATE_SQL, [SCORE, CLIENT_ID, BEACH_ID], (err, updateResult) => {
				if (err) {
					console.error('Erro ao atualizar avaliação:', err);
					return res.status(500).json({ error: 'Erro ao atualizar avaliação.' });
				}
				return res.status(200).json({ message: 'Avaliação atualizada com sucesso.' });
			});
		} else {
			const INSERT_SQL = `INSERT INTO EVALUATIONS (CLIENT_ID, BEACH_ID, SCORE) VALUES (?, ?, ?)`;

			DATABASE.query(INSERT_SQL, [CLIENT_ID, BEACH_ID, SCORE], (err, insertResult) => {
				if (err) {
					console.error('Erro ao inserir avaliação:', err);
					return res.status(500).json({ error: 'Erro ao guardar nova avaliação.' });
				}
				return res.status(201).json({ message: 'Avaliação guardada com sucesso.' });
			});
		}
	});
});

module.exports = ROUTER;