const APP = require('./index');

const PORT = 5000;

APP.listen(PORT, () => {
    console.log(`Server inicializado na porta ${PORT}`);
});