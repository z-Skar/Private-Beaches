const EXPRESS = require('express');
const CORS = require('cors');

const APP = EXPRESS();

APP.use(CORS());
APP.use(EXPRESS.json());

const CLIENTS_ROUTE = require('./routes/clients'); // Importa as rotas.
APP.use('/clients', CLIENTS_ROUTE); // Associa a rota "clients" ao caminho "/clients".

module.exports = APP