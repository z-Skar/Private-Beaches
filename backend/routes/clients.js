const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const DATABASE = require('../database/db-connection');
const UPLOAD = require('../middlewares/imageUploader');
const BCRYPT = require('bcrypt');
const PATH = require('path');
const FS = require('fs');

ROUTER.get('/', (req, res) => {
    const SQL = 'SELECT * FROM clients;'
    DATABASE.query(SQL, (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        };
    });
});

ROUTER.post('/register', async (req, res) => {
    const { FULL_NAME, EMAIL, PASSWORD } = req.body;
    if (!FULL_NAME || !EMAIL || !PASSWORD) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    };

    try {
        const CONFIRM_EMAIL_SQL = 'SELECT EMAIL FROM Clients WHERE EMAIL = ?';
        const emailExists = await new Promise((resolve, reject) => {
            DATABASE.query(CONFIRM_EMAIL_SQL, [EMAIL], (err, data) => {
                if (err) reject(err);
                resolve(data.length !== 0);
            });
        });

        if (emailExists) {
            return res.status(400).json({ EMAIL: 'O email inserido já foi utilizado.' });
        };
        
        const SALT_ROUNDS = 10;
        const HASHED_PASSWORD = await BCRYPT.hash(PASSWORD, SALT_ROUNDS);
        const REGISTER_SQL = 'INSERT INTO Clients (FULL_NAME, EMAIL, PASSWORD) VALUES (?, ?, ?)';

        
        DATABASE.query(REGISTER_SQL, [FULL_NAME, EMAIL, HASHED_PASSWORD], (err, data) => {
            if (err) {
                return res.status(500).json({error: 'Falha ao adicionar cliente.'});
            };
            
            const FETCH_PICTURE_SQL = 'SELECT * FROM Clients WHERE EMAIL = ?';
            DATABASE.query(FETCH_PICTURE_SQL, [EMAIL], (err, data) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao obter a imagem de perfil do cliente.' });
                };

                if (data.length === 0) {
                    return res.status(404).json({ error: 'Utilizador não encontrado após registro.' });
                };

                const PICTURE = data[0].PROFILE_PICTURE;
                const JWT = require('jsonwebtoken');
                const PAYLOAD = {
                    CLIENT_ID: data[0].CLIENT_ID,
                    EMAIL: EMAIL,
                    FULL_NAME: FULL_NAME,
                    PICTURE: PICTURE,
                    ROLE: data[0].ROLE
                };
                const TOKEN = JWT.sign(PAYLOAD, 'secret_key', { expiresIn: '1h' });
    
                res.status(200).json({
                    message: 'Registro e login bem-sucedidos!',
                    token: TOKEN,
                    payload: PAYLOAD
                });
            });
        });
    } catch (error) {
        res.status(500).json({error : 'Erro interno do servidor'});
    };
});

ROUTER.post('/login', (req, res) => {
    const { EMAIL, PASSWORD } = req.body;
    const SQL = 'SELECT * FROM Clients WHERE EMAIL = ?';

    DATABASE.query(SQL, [EMAIL], async (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao consultar a base de dados.' });
        };

        if (data.length === 0) {
            return res.status(404).json({ EMAIL: '', PASSWORD: 'Utilizador não encontrado.' });
        };

        const CLIENT = data[0];

        const isPasswordValid = await BCRYPT.compare(PASSWORD, CLIENT.PASSWORD);
        if (!isPasswordValid) {
            return res.status(401).json({ EMAIL: '', PASSWORD: 'Password incorreta.' });
        };

        const JWT = require('jsonwebtoken');
        const PAYLOAD = {
            CLIENT_ID: CLIENT.CLIENT_ID,
            EMAIL: CLIENT.EMAIL,
            FULL_NAME: CLIENT.FULL_NAME,
            PICTURE: CLIENT.PROFILE_PICTURE,
            ROLE: CLIENT.ROLE
        };
        const TOKEN = JWT.sign(PAYLOAD, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login bem-sucedido!',
            token: TOKEN,
            payload: PAYLOAD
        });
    });
});

ROUTER.get('/admin', (req, res) => {
    const searchTerm = req.query.search || '';

    let SQL = `
        SELECT CLIENT_ID AS 'Cliente-ID', 
               FULL_NAME AS 'Nome', 
               EMAIL AS 'Email', 
               YEAR_OF_BIRTH AS 'Data de Nascimento', 
               CONTACT AS 'Contacto',
               ROLE AS 'Permissão',
               PROFILE_PICTURE AS 'Perfil'
        FROM clients
    `;

    const queryParams = [];

    if (searchTerm) {
        const searchColumns = [
            "FULL_NAME",
            "EMAIL",
            "CONTACT"
        ];
        const likeClauses = searchColumns.map(col => `${col} LIKE ?`).join(' OR ');
        SQL += ` WHERE ${likeClauses}`;
        searchColumns.forEach(() => queryParams.push(`%${searchTerm}%`));
    };

    SQL += ` ORDER BY CLIENT_ID DESC`;

    DATABASE.query(SQL, queryParams, (err, data) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            const FULL_NAME = 'Nome';
            const CONTACT = 'Contacto';
            const YEAR_OF_BIRTH = 'Data de Nascimento';
            data = data.map(record => ({
                ...record,
                [FULL_NAME]: record[FULL_NAME] ? record[FULL_NAME] : 'Não Definido',
                [CONTACT]: record[CONTACT] ? record[CONTACT] : 'Não Definido',
                [YEAR_OF_BIRTH]: record[YEAR_OF_BIRTH] ? record[YEAR_OF_BIRTH].toISOString().split('T')[0] : 'Não Definido'
            }));
            return res.status(200).json(data);
        };
    });
});

ROUTER.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const SQL = `SELECT C.PROFILE_PICTURE,
                        C.FULL_NAME,
                        C.EMAIL,
                        C.CONTACT,
                        DATE_FORMAT(C.YEAR_OF_BIRTH, '%Y-%m-%d') AS YEAR_OF_BIRTH,

                        L.STATUS AS LIFEGUARD_STATUS,
                        L.SALARY,
                        L.LIFEGUARD_NIF
                FROM Clients C
                LEFT JOIN Lifeguards L ON C.CLIENT_ID = L.CLIENT_ID
                WHERE C.CLIENT_ID = ?`;

    DATABASE.query(SQL, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        } return res.status(200).json(data);
    });
});

ROUTER.put('/edit/:id', UPLOAD.CLIENT_IMAGE.single('Perfil'), (req, res) => {
    let { Nome, Nascimento, Permission } = req.body;
    const CLIENT_ID = req.params.id;
    
    console.log(Nascimento);
    if (Nascimento === '' || Nascimento === '0000-00-00' || Nascimento === 'Não Definido') {
        Nascimento = null;
    };
    
    const SQL = `UPDATE Clients SET FULL_NAME = ?, YEAR_OF_BIRTH = ?, ROLE = ? WHERE CLIENT_ID = ?`;
    const VALUES = [Nome, Nascimento, Permission, CLIENT_ID];
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
            return res.status(400).json({ error: 'Nenhum cliente encontrado com esse ID para atualizar.' });
        };
        if (PICTURE) {
            const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
            const IMAGE_PATH = `/images/${PICTURE}`;
            const SQL_UPDATE_IMAGE = `UPDATE Clients SET PROFILE_PICTURE = ? WHERE CLIENT_ID = ?`;
            try {
                FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);
                DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, CLIENT_ID], (err, DBres) => {
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
            const SQL_SET_DEFAULT_IMAGE = `UPDATE Clients SET PROFILE_PICTURE = '/images/default-profile-picture.webp' WHERE CLIENT_ID = ?`;
            DATABASE.query(SQL_SET_DEFAULT_IMAGE, [CLIENT_ID], (err, DBres) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao definir a imagem padrão.', details: err });
                };
                return res.status(200).json({ success: 'Registo atualizado com a imagem padrão.' });
            });
        };
    });
});

ROUTER.put('/user/edit/:id', UPLOAD.CLIENT_IMAGE.single('Perfil'), (req, res) => {
  let { FULL_NAME, YEAR_OF_BIRTH, CONTACT } = req.body;
  const CLIENT_ID = req.params.id;

  if (YEAR_OF_BIRTH === '' || YEAR_OF_BIRTH === '0000-00-00' || YEAR_OF_BIRTH === 'Não Definido') {
    YEAR_OF_BIRTH = null;
  }

  const SQL = `UPDATE Clients SET FULL_NAME = ?, YEAR_OF_BIRTH = ?, CONTACT = ? WHERE CLIENT_ID = ?`;
  const VALUES = [FULL_NAME, YEAR_OF_BIRTH, CONTACT, CLIENT_ID];

  const PICTURE = req.file ? req.file.filename : null;
  const TMP_FILE_PATH = PICTURE ? PATH.join(__dirname, '../images/tmp', PICTURE) : null;

  DATABASE.query(SQL, VALUES, (err, DBres) => {
    if (err) {
      console.error(err);
      if (PICTURE) FS.unlinkSync(TMP_FILE_PATH);
      return res.status(500).json({ error: 'Erro ao atualizar os dados do cliente.', details: err });
    }

    if (DBres.affectedRows === 0) {
      if (PICTURE) FS.unlinkSync(TMP_FILE_PATH);
      return res.status(400).json({ error: 'Cliente não encontrado.' });
    }

    if (PICTURE) {
      const FINAL_FILE_PATH = PATH.join(__dirname, '../images', PICTURE);
      const IMAGE_PATH = `/images/${PICTURE}`;
      try {
        FS.renameSync(TMP_FILE_PATH, FINAL_FILE_PATH);
        const SQL_UPDATE_IMAGE = `UPDATE Clients SET PROFILE_PICTURE = ? WHERE CLIENT_ID = ?`;
        DATABASE.query(SQL_UPDATE_IMAGE, [IMAGE_PATH, CLIENT_ID], (err, DBres) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao guardar a imagem de perfil.', details: err });
          }
          return res.status(200).json({ success: 'Perfil atualizado com imagem.' });
        });
      } catch (renameError) {
        FS.unlinkSync(TMP_FILE_PATH);
        console.error(renameError);
        return res.status(500).json({ error: 'Erro ao mover a imagem.', details: renameError });
      }
    } else {
      return res.status(200).json({ success: 'Perfil atualizado sem imagem.' });
    }
  });
});

ROUTER.put('/edit-password/:id', (req, res) => {
	const clientID = req.params.id;
	const { OLD_PASSWORD, NEW_PASSWORD } = req.body;
    const SALT_ROUNDS = 10;

	const SQL_SELECT = `SELECT PASSWORD FROM Clients WHERE CLIENT_ID = ?`;
	DATABASE.query(SQL_SELECT, [clientID], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Erro ao obter a password atual.', details: err });
		}

		if (results.length === 0) {
			return res.status(404).json({ error: 'Cliente não encontrado.' });
		}

		const currentHashedPassword = results[0].PASSWORD;
        console.log(OLD_PASSWORD, ' , ', NEW_PASSWORD);
        console.log(currentHashedPassword, ' , ', OLD_PASSWORD);

		//Verificar se a password antiga está correta
		BCRYPT.compare(OLD_PASSWORD, currentHashedPassword, (compareErr, isMatch) => {
			if (compareErr) {
				console.error(compareErr);
				return res.status(500).json({ error: 'Erro ao verificar a password.' });
			}

			if (!isMatch) {
				return res.status(401).json({ error: 'Password atual incorreta.' });
			}

			// Encriptar a nova password
			BCRYPT.hash(NEW_PASSWORD, SALT_ROUNDS, (hashErr, hashedPassword) => {
				if (hashErr) {
					console.error(hashErr);
					return res.status(500).json({ error: 'Erro ao encriptar a nova password.' });
				};

				const SQL_UPDATE = `UPDATE Clients SET PASSWORD = ? WHERE CLIENT_ID = ?`;
				DATABASE.query(SQL_UPDATE, [hashedPassword, clientID], (updateErr, updateResult) => {
					if (updateErr) {
						console.error(updateErr);
						return res.status(500).json({ error: 'Erro ao atualizar a password.', details: updateErr });
					};

					if (updateResult.affectedRows === 0) {
						return res.status(400).json({ error: 'Cliente não encontrado para atualização.' });
					};

					return res.status(200).json({ success: 'Password atualizada com sucesso.' });
				});
			});
		});
	});
});

module.exports = ROUTER;