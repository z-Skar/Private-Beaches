const express = require('express');
const mysql = require('mysql');

const app = express();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'privatebeaches'
});

pool.getConnection(err => {
    if (err) {
        console.log("Erro ao conectar a base de dados Mysql: ", err)
        return;
    } console.log("Conexão estabelecida com a base de dados Mysql");
});

app.listen(3000, () => {
	console.log(`Server established at 3000`);
});

export const getBeaches = app.get("/", (req, res) => {
    pool.query("SELECT * FROM beaches", (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            res.status(500).json({ error: 'Erro ao buscar dados.' });
            return;
        }
        res.json(results);
    })
});
