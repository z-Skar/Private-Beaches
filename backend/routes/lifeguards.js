const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');

const { CensorField } = require('../util/CensorField')

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

ROUTER.get('/admin', (req, res) => {
    const SQL = `SELECT LIFEGUARD_ID, LIFEGUARD_NIF, FULL_NAME, YEAR_OF_BIRTH, 
                 EMAIL, CONTACT, SALARY, STATUS 
                 FROM Lifeguards 
                 ORDER BY LIFEGUARD_ID DESC;`
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = data.map(record => ({
                ...record,
                LIFEGUARD_NIF: CensorField(record.LIFEGUARD_NIF),
                YEAR_OF_BIRTH: record.YEAR_OF_BIRTH.toISOString().split('T')[0]
            }));
            return res.status(200).json(data);
        };
    });
});

module.exports = ROUTER;