const EXPRESS = require('express');
const CORS = require('cors');

const APP = EXPRESS();

APP.use(CORS());
APP.use(EXPRESS.json());

const CLIENTS_ROUTE = require('./routes/clients'); // Importa a rota clients.
const BEACHES_ROUTE = require('./routes/beaches');

APP.use('/clients', CLIENTS_ROUTE); // Associa a rota "clients" ao caminho "/clients".
APP.use('/beaches', BEACHES_ROUTE);

module.exports = APP