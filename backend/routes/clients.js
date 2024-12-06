const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection')

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

ROUTER.post('/add', (req, res) => {
    const SQL = 'INSERT INTO Clients (CLIENT_NIF, NAME, YEAR_OF_BIRTH, EMAIL, CONTACT) VALUES (?, ?, ?, ?, ?)';    
    const { NIF, NAME, YEAR_OF_BIRTH, EMAIL, CONTACT } = req.body;
    DATABASE.query(SQL, [NIF, NAME, YEAR_OF_BIRTH, EMAIL, CONTACT], (err, data) => {
        if (err) {
            console.log("Erro ao inserir registo: ", err)
            return res.status(500).json({error: 'Falha ao adicionar cliente.'});
        };
        console.log("O registo foi adicionado à base de dados com sucesso.");
        return res.status(200).json({message: 'Cliente adicionado com sucesso.', data});
    });
});

module.exports = ROUTER;