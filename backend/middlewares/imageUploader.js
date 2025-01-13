<<<<<<< HEAD
const MULTER = require('multer');
const UPLOAD = MULTER({ dest: 'images/' });

module.exports = UPLOAD;
=======
const MULTER = require('multer');
const PATH = require('path');
const DATABASE = require('../database/db-connection')

const storage = MULTER.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH.join(__dirname, '../images/tmp'));
    },
    filename: (req, file, cb) => {
        DATABASE.query('SELECT MAX(BEACH_ID) AS MAX_ID FROM Beaches', (err, data) => {
            if (err) {
                console.error(err);
                return cb(new Error('Erro ao obter o último ID de Praia.'));
            }

            const NEW_ID = data[0].MAX_ID + 1;
            const FILE_EXTENSION = PATH.extname(file.originalname);
            const ENTITY = 'beach';
            const FILE_NAME = `${ENTITY}_${NEW_ID}${FILE_EXTENSION}`;
            cb(null, FILE_NAME);
        });
    },
});

const IMAGE_UPLOAD = MULTER({ storage: storage });

module.exports = IMAGE_UPLOAD;
>>>>>>> 2bb6295f744d936d33455b932ad850b603fae928
