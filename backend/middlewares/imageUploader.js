const MULTER = require('multer');
const UPLOAD = MULTER({ dest: 'images/' });

module.exports = UPLOAD;