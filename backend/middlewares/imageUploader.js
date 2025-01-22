const MULTER = require('multer');
const PATH = require('path');
const DATABASE = require('../database/db-connection')

const beachStorage = MULTER.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH.join(__dirname, '../images/tmp'));
    },
    filename: (req, file, cb) => {
        DATABASE.query('SELECT MAX(BEACH_ID) AS MAX_ID FROM Beaches', (err, data) => {
            if (err) {
                console.error(err);
                return cb(new Error('Erro ao obter o último ID de Praia.'));
            };

            const NEW_ID = data[0].MAX_ID + 1;
            const FILE_EXTENSION = PATH.extname(file.originalname);
            const ENTITY = 'beach';
            const FILE_NAME = `${ENTITY}_${NEW_ID}${FILE_EXTENSION}`;
            cb(null, FILE_NAME);
        });
    },
});

const lifeguardStorage = MULTER.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH.join(__dirname, '../images/tmp'));
    },
    filename: (req, file, cb) => {
        DATABASE.query('SELECT MAX(LIFEGUARD_ID) AS MAX_ID FROM Lifeguards', (err, data) => {
            if (err) {
                console.error(err);
                return cb(new Error('Erro ao obter o último ID de Salva-vidas.'));
            };

            const NEW_ID = data[0].MAX_ID + 1;
            const FILE_EXTENSION = PATH.extname(file.originalname);
            const ENTITY = 'lifeguard';
            const FILE_NAME = `${ENTITY}_${NEW_ID}${FILE_EXTENSION}`;
            cb(null, FILE_NAME);
        });
    },
});

const BEACH_IMAGE = MULTER({ storage: beachStorage });
const LIFEGUARD_IMAGE = MULTER({ storage: lifeguardStorage });

module.exports = {
    BEACH_IMAGE,
    LIFEGUARD_IMAGE,
};
