const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');
const UPLOAD = require('../middlewares/imageUploader');
const PATH = require('path');
const FS = require('fs');

const { CensorField } = require('../util/CensorField')

ROUTER.get('/', (req, res) => {
    const { onlyNecessary } = req.params;
    let SQL;
    
    if(onlyNecessary){
        SQL = 'SELECT * FROM lifeguards';
    } else {
        SQL = 'SELECT LIFEGUARD_ID, FULL_NAME FROM Lifeguards WHERE STATUS = "ATIVO"';
    };
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = [...data, {LIFEGUARD_ID: null, FULL_NAME: 'Indisponível'}];
            return res.status(200).json(data);
        };
    });
});

ROUTER.post('/register', UPLOAD.LIFEGUARD_IMAGE.single('PICTURE'), async (req, res) => {
    const { NIF, FULL_NAME, YEAR_OF_BIRTH, EMAIL, CONTACT } = req.body
    const SQL = 'INSERT INTO Lifeguards (LIFEGUARD_NIF, FULL_NAME, YEAR_OF_BIRTH, EMAIL, CONTACT) VALUES (?, ?, ?, ?, ?)';
    const VALUES = [NIF, FULL_NAME, YEAR_OF_BIRTH, EMAIL, CONTACT];
    const PICTURE = req.file ? req.file.filename : null;

    DATABASE.query(SQL, VALUES, (err, DBres) => {
        const TMP_FILE_PATH = PICTURE ? PATH.join(__dirname, '../images/tmp', PICTURE) : null;
        if (err) {
            console.log(err);
            if (PICTURE) {
                FS.unlinkSync(TMP_FILE_PATH);
            };
            return res.status(500).json({error: 'Falha ao adicionar salva-vidas.'});
        };

        const LIFEGUARD_ID = DBres.insertId;
        if (PICTURE) {
            const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
            const IMAGE_PATH = `/images/${PICTURE}`;
            const SQL_UPDATE_IMAGE = `UPDATE Lifeguards SET PROFILE_PICTURE = ? WHERE LIFEGUARD_ID = ?`;
            try {
                FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);  // Mover a imagem para o diretório final
                DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, LIFEGUARD_ID], (err, DBres) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao atualizar a imagem.' });
                    };
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

ROUTER.get('/admin', (req, res) => {
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT LIFEGUARD_ID AS 'Salva-Vidas-ID', 
               LIFEGUARD_NIF AS NIF, 
               FULL_NAME AS Nome, 
               YEAR_OF_BIRTH AS 'Data de Nascimento', 
               EMAIL AS Email, 
               CONTACT AS Contacto, 
               SALARY AS Salário, 
               STATUS AS Estado,
               PROFILE_PICTURE AS 'Perfil'
        FROM Lifeguards
    `;

    const queryParams = [];

    if (searchTerm) {
        const searchColumns = [
            "FULL_NAME",
            "EMAIL",
            "CONTACT",
            "SALARY",
            "STATUS"
        ];
        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    };

    SQL += ` ORDER BY LIFEGUARD_ID DESC`;
    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = data.map(record => ({
                ...record,
                NIF: CensorField(record.NIF),
                'Data de Nascimento': record['Data de Nascimento'].toISOString().split('T')[0],
                Salário: Number(record.Salário).toFixed(2) + '€'
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.put('/edit/:id', UPLOAD.LIFEGUARD_IMAGE.single('Perfil'), (req, res) => {
    let { Nome, Salary, Estado } = req.body;
    const LIFEGUARD_ID = req.params.id;

    const SQL = `UPDATE Lifeguards SET FULL_NAME = ?, SALARY = ?, STATUS = ? WHERE LIFEGUARD_ID = ?`;
    const VALUES = [Nome, Salary, Estado, LIFEGUARD_ID];
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
            return res.status(400).json({ error: 'Nenhum salva-vidas encontrado com esse ID para atualizar.' });
        };
        if (PICTURE) {
            const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
            const IMAGE_PATH = `/images/${PICTURE}`;
            const SQL_UPDATE_IMAGE = `UPDATE Lifeguards SET PROFILE_PICTURE = ? WHERE LIFEGUARD_ID = ?`;
            try {
                FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);
                DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, LIFEGUARD_ID], (err, DBres) => {
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
            const SQL_SET_DEFAULT_IMAGE = `UPDATE Lifeguards SET PROFILE_PICTURE = '/images/default-profile-picture.png' WHERE LIFEGUARD_ID = ?`;
            DATABASE.query(SQL_SET_DEFAULT_IMAGE, [LIFEGUARD_ID], (err, DBres) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao definir a imagem padrão.', details: err });
                };
                return res.status(200).json({ success: 'Registo atualizado com a imagem padrão.' });
            });
        };
    });
});

ROUTER.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).send('ID inválido.')
    };

    const SQL = `DELETE FROM Lifeguards WHERE LIFEGUARD_ID = ?`;

    DATABASE.query(SQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json({success: 'Registo eliminado com sucesso.'});
    });
});

module.exports = ROUTER;