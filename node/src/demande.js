const db = require("../db");

const createDemande = (demande, callback) => {
  const { id, idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat } = demande;
  const query = `
    INSERT INTO Demande (id, idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [id, idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat], callback);
};

const getAllDemandes = (callback) => {
  const query = "SELECT * FROM Demande";
  db.query(query, callback);
};

const getDemandeById = (id, callback) => {
  const query = "SELECT * FROM Demande WHERE id = ?";
  db.query(query, [id], callback);
};

const updateDemande = (id, demande, callback) => {
  const { idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat } = demande;
  const query = `
    UPDATE Demande 
    SET idArt = ?, idUserDM = ?, statut = ?, idMethodePayer = ?, dateDebut = ?, dateFin = ?, idContrat = ? 
    WHERE id = ?
  `;
  db.query(query, [idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat, id], callback);
};

const deleteDemande = (id, callback) => {
  const query = "DELETE FROM Demande WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createDemande,
  getAllDemandes,
  getDemandeById,
  updateDemande,
  deleteDemande,
};
