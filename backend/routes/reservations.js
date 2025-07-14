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
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT RESERVATION_ID AS 'Reserva-ID', 
               Clients.FULL_NAME AS Cliente, 
               COALESCE(Beaches.BEACH_NAME, '[N/A]') AS Praia, 
               RESERVATION_END AS 'Data de Início', 
               RESERVATION_START AS 'Data de Fim' 
        FROM Reservations 
        INNER JOIN Clients ON Reservations.CLIENT_ID = Clients.CLIENT_ID 
        LEFT JOIN Beaches ON Reservations.BEACH_ID = Beaches.BEACH_ID
    `;

    const queryParams = [];

    if (searchTerm) {
        const searchColumns = [
            "Clients.FULL_NAME",
            "Beaches.BEACH_NAME",
        ];
        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    }

    // Ordenação
    SQL += ` ORDER BY RESERVATION_ID DESC`;

    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            const RESERVATION_START = 'Data de Início';
            const RESERVATION_END = 'Data de Fim';
            data = data.map(record => ({
                ...record,
                [RESERVATION_START]: record[RESERVATION_START].toISOString().split('T')[0],
                [RESERVATION_END]: record[RESERVATION_END].toISOString().split('T')[0]
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.post('/create', (req, res) => {
	const {
		CLIENT_ID,
		BEACH_ID,
		RESERVATION_START,
		RESERVATION_END,
		CREDIT_CARD_NUMBER,
		BILL_COST
	} = req.body;

	// Validação simples
	if (!CLIENT_ID || !BEACH_ID || !RESERVATION_START || !RESERVATION_END || !BILL_COST) {
		return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
	}

	DATABASE.getConnection((err, connection) => {
		if (err) {
			return res.status(500).json({ error: 'Erro ao obter conexão com a base de dados.', details: err });
		}

		const checkOverlapSQL = `
            SELECT * FROM Reservations
            WHERE BEACH_ID = ?
            AND (RESERVATION_START <= ? AND RESERVATION_END >= ?)
		`;

		connection.query(checkOverlapSQL, [BEACH_ID, RESERVATION_END, RESERVATION_START], (err, overlapResults) => {
			if (err) {
				connection.release();
				return res.status(500).json({ error: 'Erro ao verificar sobreposição de datas.', details: err });
			}

			if (overlapResults.length > 0) {
				connection.release();
				return res.status(409).json({ error: 'O período selecionado se sobrepõe a uma reserva existente.' });
			};  

			connection.beginTransaction((err) => {
				if (err) {
					connection.release();
					return res.status(500).json({ error: 'Erro ao iniciar transação.', details: err });
				}

				const SQL_INSERT_RESERVATION = `
					INSERT INTO Reservations (CLIENT_ID, BEACH_ID, RESERVATION_START, RESERVATION_END)
					VALUES (?, ?, ?, ?)
				`;

				connection.query(SQL_INSERT_RESERVATION, [CLIENT_ID, BEACH_ID, RESERVATION_START, RESERVATION_END], (err, result) => {
					if (err) {
						return connection.rollback(() => {
							connection.release();
							res.status(500).json({ error: 'Erro ao criar reserva.', details: err });
						});
					}

					const RESERVATION_ID = result.insertId;

					const SQL_INSERT_BILL = `
						INSERT INTO Bills (RESERVATION_ID, CREDIT_CARD_NUMBER, BILL_COST) 
						VALUES (?, ?, ?)
					`;

					connection.query(SQL_INSERT_BILL, [RESERVATION_ID, CREDIT_CARD_NUMBER, BILL_COST], (err) => {
						if (err) {
							return connection.rollback(() => {
								connection.release();
								res.status(500).json({ error: 'Erro ao criar fatura.', details: err });
							});
						}

						connection.commit((err) => {
							if (err) {
								return connection.rollback(() => {
									connection.release();
									res.status(500).json({ error: 'Erro ao confirmar transação.', details: err });
								});
							}

							connection.release();
							res.status(200).json({ success: 'Reserva e fatura criadas com sucesso.' });
						});
					});
				});
			});
		});
	});
});

ROUTER.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send('ID inválido.')
    };

    const SQL = `DELETE FROM Reservations WHERE RESERVATION_ID = ?`;

    DATABASE.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json({success: 'Registo eliminado com sucesso.'});
    });
});

ROUTER.get('/blocked/:id', (req, res) => {
    const beachID = req.params.id;

	if (!beachID) {
		return res.status(400).json({ error: "ID da praia não fornecido." });
	};

    const SQL = `SELECT RESERVATION_START, RESERVATION_END
		         FROM Reservations
		         WHERE BEACH_ID = ?`;

    DATABASE.query(SQL, [beachID], (err, data) => {
        if (err) {
			console.error("Erro ao buscar reservas bloqueadas:", err);
			return res.status(500).json({ error: "Erro ao buscar períodos bloqueados." });
        };
        res.json(data);
    });
});

ROUTER.get('/client/:id', (req, res) => {
    const clientID = req.params.id;

    if (!clientID) {
        return res.status(400).json({ error: "ID do cliente não fornecido." });
    };

    const SQL = `SELECT R.*, B.*, BL.* 
				 FROM Reservations R
				 INNER JOIN Beaches B ON R.BEACH_ID = B.BEACH_ID
				 INNER JOIN Bills BL ON BL.RESERVATION_ID = R.RESERVATION_ID
				 WHERE CLIENT_ID = ?
				 ORDER BY RESERVATION_START ASC
				 `;

    DATABASE.query(SQL, [clientID], (err, data) => {
        if (err) {
            console.error("Erro ao buscar reservas do cliente:", err);
            return res.status(500).json({ error: "Erro ao buscar reservas do cliente." });
        };
        res.json(data);
    });
});

module.exports = ROUTER;