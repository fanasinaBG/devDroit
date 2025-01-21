const db = require('./db');

// Récupérer tous les contrats
const getContrats = async () => {
  const query = 'SELECT * FROM Contrats';
  const result = await db.query(query);
  return result.rows;
};

// Créer un nouveau contrat
const createContrat = async (contrat) => {
  const { objet, date_debut, date_fin, territoire, type_licence, iduserProp, idUserDM, statue } = contrat;
  const query = `
    INSERT INTO Contrats (objet, date_debut, date_fin, territoire, type_licence, iduserProp, idUserDM,statue)
    VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
    RETURNING *;
  `;
  const result = await db.query(query, [objet, date_debut, date_fin, territoire, type_licence, iduserProp, idUserDM,statue]);
  return result.rows[0];
};

// Obtenir un contrat par ID
const getContratById = async (id) => {
  const query = 'SELECT * FROM Contrats WHERE id = $1';
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Mettre à jour un contrat
const updateContrat = async (id, contrat) => {
  const { objet, date_debut, date_fin, territoire, type_licence, iduserProp, idUserDM } = contrat;
  const query = `
    UPDATE Contrats
    SET objet = $1, date_debut = $2, date_fin = $3, territoire = $4, type_licence = $5, iduserProp = $6, idUserDM = $7
    WHERE id = $8
    RETURNING *;
  `;
  const result = await db.query(query, [objet, date_debut, date_fin, territoire, type_licence, iduserProp, idUserDM, id]);
  return result.rows[0];
};

const updateDateArt = async (id, date) => {
  const query = `
    UPDATE Art
    SET datefin = $1
    WHERE id = $2;
  `;
  console.log(date);
  
  await db.query(query, [date, id]);
};

// Supprimer un contrat
const deleteContrat = async (id) => {
  const query = 'DELETE FROM Contrats WHERE id = $1';
  await db.query(query, [id]);
};

module.exports = {
  getContrats,
  createContrat,
  getContratById,
  updateContrat,
  deleteContrat,
  updateDateArt,
};
