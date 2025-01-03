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
            res.status(201).json({message: 'Cliente adicionado com sucesso.', data});
        });
    } catch (error) {
        res.status(500).json({error : 'Erro interno do servidor'});
    };
});

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT CLIENT_ID, FULL_NAME, EMAIL, YEAR_OF_BIRTH, CONTACT 
                 FROM clients
                 ORDER BY CLIENT_ID DESC;`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = data.map(record => ({
                ...record,
                YEAR_OF_BIRTH: record.YEAR_OF_BIRTH.toISOString().split('T')[0]
            }));
            return res.status(200).json(data);
        };
    });
});

module.exports = ROUTER;