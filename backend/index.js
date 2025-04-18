const EXPRESS = require('express');
const CORS = require('cors');
const PATH = require('path');

const APP = EXPRESS();

APP.use(CORS());
APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true })); // Sem isto o ficheiro não é reconhecido no backend.


const HOME_ROUTE = require('./routes/home');
const BEACHES_ROUTE = require('./routes/beaches');
const BILLS_ROUTE = require('./routes/bills');
const CLIENTS_ROUTE = require('./routes/clients'); // Importa a rota clients.
const LIFEGUARDS_ROUTE = require('./routes/lifeguards');
const EVALUATIONS_ROUTE = require('./routes/evaluations');
const RESERVATIONS_ROUTE = require('./routes/reservations');
const INFORMATION = require('./routes/information');

APP.use('/home', HOME_ROUTE);
APP.use('/beaches', BEACHES_ROUTE);
APP.use('/bills', BILLS_ROUTE);
APP.use('/clients', CLIENTS_ROUTE); // Associa a rota "clients" ao caminho "/clients".
APP.use('/lifeguards', LIFEGUARDS_ROUTE);
APP.use('/reservations', RESERVATIONS_ROUTE);
APP.use('/evaluations', EVALUATIONS_ROUTE);
APP.use('/information', INFORMATION);
APP.use('/images', EXPRESS.static(PATH.join(__dirname, 'images')));
// Uma rota especial que irá permitir o acesso a imagens do servidor através do caminhio direto delas.

module.exports = APP;