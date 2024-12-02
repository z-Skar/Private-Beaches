const EXPRESS = require('express');
const CORS = require('cors');

const APP = EXPRESS();

APP.use(CORS());
APP.use(EXPRESS.json());

const BEACHES_ROUTE = require('./routes/beaches');
const BILLS_ROUTE = require('./routes/bills');
const CLIENTS_ROUTE = require('./routes/clients'); // Importa a rota clients.
const LIFEGUARDS_ROUTE = require('./routes/lifeguards');
const RESERVATIONS_ROUTE = require('./routes/reservations');

APP.use('/beaches', BEACHES_ROUTE);
APP.use('/bills', BILLS_ROUTE);
APP.use('/clients', CLIENTS_ROUTE); // Associa a rota "clients" ao caminho "/clients".
APP.use('/lifeguards', LIFEGUARDS_ROUTE);
APP.use('/reservations', RESERVATIONS_ROUTE);

module.exports = APP;