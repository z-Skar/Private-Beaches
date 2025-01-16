const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');
const BCRYPT = require('bcrypt');

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM clients;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        };
    });
});

ROUTER.post('/register', async (req, res) => {
    const { EMAIL, PASSWORD } = req.body;
    try {
        const SALT_ROUNDS = 10;
        const HASHED_PASSWORD = await BCRYPT.hash(PASSWORD, SALT_ROUNDS);
        const SQL = 'INSERT INTO Clients (EMAIL, PASSWORD) VALUES (?, ?)';

        DATABASE.query(SQL, [EMAIL, HASHED_PASSWORD], (err, data) => {
            if (err) {
                return res.status(500).json({error: 'Falha ao adicionar cliente.'});
            };
            res.status(200).json({message: 'Cliente adicionado com sucesso.', data});
        });
    } catch (error) {
        res.status(500).json({error : 'Erro interno do servidor'});
    };
});

ROUTER.get('/admin', (req, res) => {
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT CLIENT_ID, FULL_NAME, EMAIL, YEAR_OF_BIRTH, CONTACT 
        FROM clients
    `;

    const queryParams = [];

    if (searchTerm) {
        const searchColumns = [
            "FULL_NAME",
            "EMAIL",
            "CONTACT"
        ];
        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    }

    SQL += ` ORDER BY CLIENT_ID DESC`;

    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = data.map(record => ({
                ...record,
                FULL_NAME: record.FULL_NAME ? record.FULL_NAME : 'NÃO DEFINIDO',
                CONTACT: record.CONTACT ? record.CONTACT : 'NÃO DEFINIDO',
                YEAR_OF_BIRTH: record.YEAR_OF_BIRTH ? record.YEAR_OF_BIRTH.toISOString().split('T')[0] : 'NÃO DEFINIDO'
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const SQL = `SELECT * FROM Clients WHERE CLIENT_ID = ?`;

    DATABASE.query(SQL, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

module.exports = ROUTER;