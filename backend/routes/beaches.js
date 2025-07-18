const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');
const UPLOAD = require('../middlewares/imageUploader');
const PATH = require('path');
const FS = require('fs');

ROUTER.get('/', (req, res) => {
    const ORDER_PARAMETER = req.query.orderBy || 'Evaluations.SCORE';
    const ORDER_DIRECTION = req.query.orderDirection || 'DESC';

    const ALLOWED_ORDER_PARAMETERS = ['Evaluations.SCORE', 'Beaches.BEACH_ID'];
    const ALLOWED_ORDER_DIRECTION = ['DESC', 'ASC'];

    if (!ALLOWED_ORDER_PARAMETERS.includes(ORDER_PARAMETER) || !ALLOWED_ORDER_DIRECTION.includes(ORDER_DIRECTION)) {
        return res.status(400).json({erro: 'Parâmetros inválidos.'});
    };

    const SQL = `SELECT Beaches.BEACH_ID, BEACH_NAME, CITY_LOCATION, COUNTRY_LOCATION, RESERVATION_COST, DESCRIPTION, SERVICE_TYPE, 
                 COALESCE(AVG(Evaluations.SCORE), 0) AS SCORE, COUNT(Evaluations.BEACH_ID) AS EVALUATIONS, PICTURE FROM Beaches 
                 LEFT JOIN Evaluations ON beaches.BEACH_ID = Evaluations.BEACH_ID 
                 WHERE (BEACH_NAME LIKE ? OR DESCRIPTION LIKE ?) 
                 AND COUNTRY_LOCATION LIKE ? AND CITY_LOCATION LIKE ? AND SERVICE_TYPE LIKE ? 
                 AND RESERVATION_COST BETWEEN ? AND ? 
                 GROUP BY Beaches.BEACH_ID 
                 ORDER BY ${ORDER_PARAMETER} ${ORDER_DIRECTION}`
    
    const filterText = req.query.textParameter ? `%${req.query.textParameter}%` : '%';
    const selectedCountry = req.query.countryParameter ? `%${req.query.countryParameter}%` : '%';
    const selectedCity = req.query.cityParameter ? `%${req.query.cityParameter}%` : '%';
    const selectedServiceType = req.query.serviceTypeParameter ? `%${req.query.serviceTypeParameter}%` : '%';
    const selectedMinCost = req.query.minCostParameter || 0;
    const selectedMaxCost = req.query.maxCostParameter || 999999;

    DATABASE.query(SQL, [filterText, filterText, selectedCountry, selectedCity,
        selectedServiceType, selectedMinCost, selectedMaxCost], (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/luxury', (req, res) => { // OBTER AS PRAIAS MAIS CARAS
    const SQL = 'SELECT BEACH_ID, BEACH_NAME, RESERVATION_COST, SERVICE_TYPE, COUNTRY_LOCATION, PICTURE FROM BEACHES '
              + 'ORDER BY RESERVATION_COST DESC LIMIT 2';
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/location', (req, res) => { // OBTER CIDADES E PAÍSES DAS PRAIAS
    const SQL = `SELECT COUNTRY_LOCATION, 
                 GROUP_CONCAT(DISTINCT CITY_LOCATION ORDER BY CITY_LOCATION SEPARATOR ", ") AS CITIES 
                 FROM BEACHES 
                 GROUP BY COUNTRY_LOCATION`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/services', (req, res) => { // OBTER TIPOS DE SERVIÇOS DISPONÍVEIS
    const SQL = `SELECT DISTINCT SERVICE_TYPE FROM BEACHES`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/columns' , (req, res) => { // OBTER NOME DAS COLUNAS DA TABELA BEACHES
    const SQL = `
        SELECT Beaches.BEACH_ID AS 'Praia-ID', 
               BEACH_NAME AS Nome, 
               DESCRIPTION AS Descrição, 
               CITY_LOCATION AS Cidade, 
               COUNTRY_LOCATION AS País, 
               RESERVATION_COST AS 'Custo de Reserva', 
               COALESCE(Lifeguards.FULL_NAME, 'Indisponível') AS 'Salva-Vidas', 
               SERVICE_TYPE AS Serviço, 
               COALESCE(AVG(Evaluations.SCORE), 0) AS 'Avaliação' 
        FROM BEACHES 
        LEFT JOIN Evaluations ON Beaches.BEACH_ID = Evaluations.BEACH_ID 
        LEFT JOIN Lifeguards ON Beaches.LIFEGUARD_ID = Lifeguards.LIFEGUARD_ID 
        GROUP BY Beaches.BEACH_ID 
        ORDER BY Beaches.BEACH_ID DESC 
        LIMIT 1`;
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.get('/admin', (req, res) => { // OBTER TODAS AS PRAIAS PARA O ADMINISTRADOR
    let SQL = `
        SELECT B.BEACH_ID AS 'Praia-ID', 
               B.BEACH_NAME AS Nome, 
               B.DESCRIPTION AS Descrição, 
               B.CITY_LOCATION AS Cidade, 
               B.COUNTRY_LOCATION AS País, 
               B.RESERVATION_COST AS 'Custo de Reserva', 
               COALESCE(C.FULL_NAME, 'Indisponível') AS 'Salva-Vidas', 
               B.SERVICE_TYPE AS Serviço, 
               COALESCE(AVG(E.SCORE), 0) AS 'Avaliação' 
        FROM BEACHES B
        LEFT JOIN Evaluations E ON B.BEACH_ID = E.BEACH_ID 
        LEFT JOIN Lifeguards L ON B.LIFEGUARD_ID = L.LIFEGUARD_ID 
        LEFT JOIN Clients C ON C.CLIENT_ID = L.CLIENT_ID
        GROUP BY B.BEACH_ID 
        ORDER BY B.BEACH_ID DESC
    `;

    const queryParams = [];
    /*
    const searchTerm = req.query.search || '';
    if (searchTerm) {
        const searchColumns = [
            "BEACH_NAME", 
            "DESCRIPTION", 
            "CITY_LOCATION", 
            "COUNTRY_LOCATION", 
            "RESERVATION_COST", 
            "SERVICE_TYPE", 
            "COALESCE(Lifeguards.FULL_NAME, 'Indisponível')"
        ];

        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    };

    SQL += `
        GROUP BY Beaches.BEACH_ID 
        ORDER BY Beaches.BEACH_ID DESC
    `;*/
    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            const RESERVATION_COST = 'Custo de Reserva';
            const AVERAGE_RATING = 'Avaliação';

            data = data.map(record => ({
                ...record,
                [RESERVATION_COST]: record[RESERVATION_COST] + '€',
                [AVERAGE_RATING]: record[AVERAGE_RATING] + '★'
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.get('/read/:id', (req, res) => { // OBTER INFORMAÇÃO DE UMA PRAIA PELO SEU ID, JUNTO DA IMAGEM, AVALIAÇÃO E NOME DO SALVA-VIDAS
    const { id } = req.params;
    const SQL = `
        SELECT 
            Beaches.*,
            AVG(Evaluations.SCORE) AS SCORE,
            COALESCE(Clients.FULL_NAME, 'Indisponível') AS LIFEGUARD_NAME,
            Clients.CLIENT_ID AS LIFEGUARD_CLIENT_ID
        FROM Beaches
        LEFT JOIN Evaluations ON Beaches.BEACH_ID = Evaluations.BEACH_ID
        LEFT JOIN Lifeguards ON Beaches.LIFEGUARD_ID = Lifeguards.LIFEGUARD_ID
        LEFT JOIN Clients ON Clients.CLIENT_ID = Lifeguards.CLIENT_ID
        WHERE Beaches.BEACH_ID = ?
        GROUP BY Beaches.BEACH_ID
    `;

    DATABASE.query(SQL, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            data = data.map(record => ({
                ...record,
                PICTURE: `http://localhost:5000${record.PICTURE}`
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.post('/add', UPLOAD.BEACH_IMAGE.single('PICTURE'), (req, res) => { // ADICIONAR UMA PRAIA
    let { BEACH_NAME, COUNTRY_LOCATION, CITY_LOCATION, DESCRIPTION,
        SERVICE_TYPE, RESERVATION_COST, LIFEGUARD_ID } = req.body;
    const SQL = `INSERT INTO Beaches (BEACH_NAME, COUNTRY_LOCATION, CITY_LOCATION, DESCRIPTION, 
                 SERVICE_TYPE, RESERVATION_COST, LIFEGUARD_ID) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    if (LIFEGUARD_ID === 'null') {
        LIFEGUARD_ID = null;
    };
    const VALUES = [BEACH_NAME, COUNTRY_LOCATION, CITY_LOCATION, DESCRIPTION,
                    SERVICE_TYPE, RESERVATION_COST, LIFEGUARD_ID];
    
    const PICTURE = req.file ? req.file.filename : null;
    DATABASE.query(SQL, VALUES, (err, DBres) => {
        const TMP_FILE_PATH = PICTURE ? PATH.join(__dirname, '../images/tmp', PICTURE) : null;
        if (err) {
            console.error(err);
            if (PICTURE) {
                FS.unlinkSync(TMP_FILE_PATH);
            };
            return res.status(500).json({ error: 'Erro adicionar os dados principais.', details: err });
        };
        const BEACH_ID = DBres.insertId;
        if (PICTURE) {
            const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
            const IMAGE_PATH = `/images/${PICTURE}`;
            const SQL_UPDATE_IMAGE = `UPDATE Beaches SET PICTURE = ? WHERE BEACH_ID = ?`;
            try {
                FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);  // Mover a imagem para o diretório final
                DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, BEACH_ID], (err, DBres) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao atualizar a imagem.' });
                    }
                    return res.status(200).json({ success: 'Registo e imagem adicionados com sucesso.' });
                });
            } catch (renameError) {
                FS.unlinkSync(TMP_FILE_PATH);
                console.error(renameError);
                return res.status(500).json({ error: 'Erro ao mover a imagem para o destino final.', details: renameError });
            }
        } else {
            return res.status(200).json({ success: 'Registo adicionado com sucesso.' });
        };
    });
});

ROUTER.put('/edit/:id', UPLOAD.BEACH_IMAGE.single('PICTURE'), (req, res) => { // EDITAR UMA PRAIA
    let { BEACH_NAME, COUNTRY_LOCATION, CITY_LOCATION, DESCRIPTION,
            SERVICE_TYPE, RESERVATION_COST, LIFEGUARD_ID } = req.body;
    
    const BEACH_ID = req.params.id;

    if (LIFEGUARD_ID === 'null') {
        LIFEGUARD_ID = null;
    };
    
    const SQL = `UPDATE Beaches SET BEACH_NAME = ?, COUNTRY_LOCATION = ?, CITY_LOCATION = ?, DESCRIPTION = ?, 
                 SERVICE_TYPE = ?, RESERVATION_COST = ?, LIFEGUARD_ID = ? WHERE BEACH_ID = ?`;
    const VALUES = [BEACH_NAME, COUNTRY_LOCATION, CITY_LOCATION, DESCRIPTION,
                    SERVICE_TYPE, RESERVATION_COST, LIFEGUARD_ID, BEACH_ID];
    const PICTURE = req.file ? req.file.filename : null;
    
    DATABASE.query(SQL, VALUES, (err, DBres) => {
        const TMP_FILE_PATH = PICTURE ? PATH.join(__dirname, '../images/tmp', PICTURE) : null;
        if (err) {
            console.error(err);
            if (PICTURE) {
                FS.unlinkSync(TMP_FILE_PATH);
            };
            return res.status(500).json({ error: 'Erro ao atualizar os dados principais.', details: err });
        };
        if (DBres.affectedRows === 0) {
            if (PICTURE) {
                FS.unlinkSync(TMP_FILE_PATH);
            };
            return res.status(400).json({ error: 'Nenhuma praia encontrada com esse ID para atualizar.' });
        };
        if (PICTURE) {
            const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
            const IMAGE_PATH = `/images/${PICTURE}`;
            const SQL_UPDATE_IMAGE = `UPDATE Beaches SET PICTURE = ? WHERE BEACH_ID = ?`;
            try {
                FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);
                DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, BEACH_ID], (err, DBres) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao renomear a imagem.' });
                    };
                    return res.status(200).json({ success: 'Registo e imagem atualizados com sucesso.' });
                });
            } catch (renameError) {
                FS.unlinkSync(TMP_FILE_PATH);
                console.error(renameError);
                return res.status(500).json({ error: 'Erro ao mover a imagem para o destino final.', details: renameError });
            };
        } else {
            return res.status(200).json({ success: 'Registo atualizado com sucesso.' });
        };
    });
});

ROUTER.delete('/delete/:id', (req, res) => { // ELIMINAR UMA PRAIA
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).send('ID inválido.')
    };
    const SQL = `DELETE FROM Beaches WHERE BEACH_ID = ?`;
    DATABASE.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json({success: 'Registo eliminado com sucesso.'});
    });
});

ROUTER.get('/cost', (req, res) => {
	const SQL = `SELECT MIN(RESERVATION_COST) AS MIN_VALUE,
						MAX(RESERVATION_COST) AS MAX_VALUE
						FROM Beaches`;
	DATABASE.query(SQL, (err, data) => {
		if (err) {
			console.error("Erro ao buscar valores de custo de reserva:", err);
			return res.status(500).json({ error: "Erro ao buscar valores de custo de reserva." });
		}
		res.json(data);
	});
});

module.exports = ROUTER;