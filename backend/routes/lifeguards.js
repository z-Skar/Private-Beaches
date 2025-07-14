const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');
const UPLOAD = require('../middlewares/imageUploader');
const PATH = require('path');
const FS = require('fs');

const { CensorField } = require('../util/CensorField')

ROUTER.get('/', (req, res) => {
    let SQL = `SELECT L.LIFEGUARD_ID,
                      C.FULL_NAME 
               FROM Lifeguards L
               INNER JOIN Clients C ON L.CLIENT_ID = C.CLIENT_ID
               WHERE L.STATUS = "ATIVO"`;

    DATABASE.query(SQL, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            data = [...data, {LIFEGUARD_ID: null, FULL_NAME: 'Indisponível'}];
            return res.status(200).json(data);
        };
    });
});

ROUTER.post('/register', (req, res) => {
  const { clientID, NIF } = req.body;

  if (!clientID || !NIF) {
    return res.status(400).json({ error: "Dados incompletos." });
  }

  const checkNifSQL = `SELECT * FROM Lifeguards WHERE LIFEGUARD_NIF = ?`;
  DATABASE.query(checkNifSQL, [NIF], (err, nifResult) => {
    if (err) {
      console.error("Erro ao verificar NIF:", err);
      return res.status(500).json({ error: "Erro interno ao validar NIF." });
    }

    if (nifResult.length > 0) {
      return res.status(409).json({ error: "Este NIF já está associado a outra candidatura." });
    }

    const checkClientSQL = `SELECT * FROM Lifeguards WHERE CLIENT_ID = ?`;
    DATABASE.query(checkClientSQL, [clientID], (err, clientResult) => {
      if (err) {
        console.error("Erro ao verificar salva-vidas:", err);
        return res.status(500).json({ error: "Erro ao verificar candidatura." });
      }

      if (clientResult.length > 0) {
        return res.status(409).json({ error: "Utilizador atual já está registado como salva-vidas." });
      }

      const insertSQL = `INSERT INTO Lifeguards (CLIENT_ID, LIFEGUARD_NIF, STATUS) VALUES (?, ?, 'Em Espera')`;
      DATABASE.query(insertSQL, [clientID, NIF], (err) => {
        if (err) {
          console.error("Erro ao registar salva-vidas:", err);
          return res.status(500).json({ error: "Erro ao submeter candidatura." });
        }

        return res.status(200).json({ success: "Candidatura submetida com sucesso." });
      });
    });
  });
});

ROUTER.get('/admin', (req, res) => {
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT L.LIFEGUARD_ID AS 'Salva-Vidas-ID', 
               L.LIFEGUARD_NIF AS NIF, 
               C.FULL_NAME AS Nome, 
               C.YEAR_OF_BIRTH AS 'Data de Nascimento', 
               C.EMAIL AS Email, 
               C.CONTACT AS Contacto, 
               L.SALARY AS Salário, 
               L.STATUS AS Estado,
               C.PROFILE_PICTURE AS 'Perfil'
        FROM Lifeguards L
        INNER JOIN Clients C ON L.CLIENT_ID = C.CLIENT_ID
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
	const { Nome, Salary, Estado } = req.body;
	const LIFEGUARD_ID = req.params.id;
	const PICTURE = req.file ? req.file.filename : null;
	const TMP_FILE_PATH = PICTURE ? PATH.join(__dirname, '../images/tmp', PICTURE) : null;

	const updateClientSQL = `UPDATE Clients 
	                         SET FULL_NAME = ? 
	                         WHERE CLIENT_ID = (SELECT CLIENT_ID FROM Lifeguards WHERE LIFEGUARD_ID = ?)`;
	DATABASE.query(updateClientSQL, [Nome, LIFEGUARD_ID], (err, resultClient) => {
		if (err) {
			console.error(err);
			if (PICTURE) FS.unlinkSync(TMP_FILE_PATH);
			return res.status(500).json({ error: 'Erro ao atualizar o nome do cliente.' });
		}

		const updateLifeguardSQL = `UPDATE Lifeguards SET SALARY = ?, STATUS = ? WHERE LIFEGUARD_ID = ?`;
		DATABASE.query(updateLifeguardSQL, [Salary, Estado, LIFEGUARD_ID], (err, resultLifeguard) => {
			if (err) {
				console.error(err);
				if (PICTURE) FS.unlinkSync(TMP_FILE_PATH);
				return res.status(500).json({ error: 'Erro ao atualizar os dados do salva-vidas.' });
			}

			if (resultLifeguard.affectedRows === 0) {
				if (PICTURE) FS.unlinkSync(TMP_FILE_PATH);
				return res.status(404).json({ error: 'Nenhum salva-vidas encontrado com esse ID.' });
			}

			if (PICTURE) {
				const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
				const IMAGE_PATH = `/images/${PICTURE}`;
				const SQL_UPDATE_IMAGE = `UPDATE Clients SET PROFILE_PICTURE = ? WHERE CLIENT_ID = (SELECT CLIENT_ID FROM Lifeguards WHERE LIFEGUARD_ID = ?)`;

				try {
					FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);
					DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, LIFEGUARD_ID], (err) => {
						if (err) {
							console.error(err);
							return res.status(500).json({ error: 'Erro ao atualizar a imagem do salva-vidas.' });
						}
						return res.status(200).json({ success: 'Registo e imagem atualizados com sucesso.' });
					});
				} catch (renameError) {
					FS.unlinkSync(TMP_FILE_PATH);
					console.error(renameError);
					return res.status(500).json({ error: 'Erro ao mover a imagem.', details: renameError });
				}
			} else {
				const SQL_SET_DEFAULT_IMAGE = `UPDATE Clients SET PROFILE_PICTURE = '/images/default-profile-picture.webp' WHERE CLIENT_ID = (SELECT CLIENT_ID FROM Lifeguards WHERE LIFEGUARD_ID = ?)`;
				DATABASE.query(SQL_SET_DEFAULT_IMAGE, [LIFEGUARD_ID], (err) => {
					if (err) {
						console.error(err);
						return res.status(500).json({ error: 'Erro ao definir a imagem padrão.' });
					}
					return res.status(200).json({ success: 'Registo atualizado com a imagem padrão.' });
				});
			}
		});
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

ROUTER.get('/cost', (req, res) => {
	const SQL = `SELECT MIN(SALARY) AS MIN_VALUE,
						          MAX(SALARY) AS MAX_VALUE
						FROM Lifeguards`;
	DATABASE.query(SQL, (err, data) => {
		if (err) {
			console.error("Erro ao buscar valores de salário:", err);
			return res.status(500).json({ error: "Erro ao buscar valores de salário." });
		}
		res.json(data);
	});
});

module.exports = ROUTER;