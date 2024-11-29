const MYSQL = require('mysql');
const POOL = MYSQL.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'privatebeaches'
});

POOL.getConnection((err, connection) => {
    if (err) {
        console.log('Erro ao criar uma ligação com a base de dados.');
        process.exit(1);
    } else {
        console.log('Ligação com a base de dados bem-sucedida');
        connection.release();
    };
});

module.exports = POOL;