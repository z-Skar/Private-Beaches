const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM lifeguards;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.post('/register', async (req, res) => {
    const { NIF, FULL_NAME, YEAR_OF_BIRTH, EMAIL, CONTACT, PROFILE_PICTURE } = req.body

    try {
        const SQL = 'INSERT INTO Lifeguards (NIF, FULL_NAME, YEAR_OF_BIRTH, EMAIL, CONTACT) VALUES (?, ?, ?, ?, ?)';

        DATABASE.query(SQL, [NIF, FULL_NAME, YEAR_OF_BIRTH, EMAIL, CONTACT, PROFILE_PICTURE], (err, data) => {
            if (err) {
                return res.status(500).json({error: 'Falha ao adicionar salva-vidas.'});
            };
            res.status(201).json({message: 'Salva-vidas adicionado com sucesso.', data});
        });
    } catch (error) {
        res.status(500).json({error : 'Erro interno do servidor'});
    };
});

module.exports = ROUTER;