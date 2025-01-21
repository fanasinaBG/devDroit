const db = require("./db");
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

const createDemande = (demande, callback) => {
  const { id, idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat } = demande;
  const query = `
    INSERT INTO Demande (id, idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [id, idArt, idUserDM, statut, idMethodePayer, dateDebut, dateFin, idContrat], callback);
};

 async function createDemandeClient (demande) {
  const { idArt, idUserDM, idUserDMD,statut } = demande;

  const query = `
    INSERT INTO Demande ( idArt, idUserDM, idUserDMD,statut) 
    VALUES ($1, $2, $3, $4)
  `;
   try{
        await pool.query(query, [ idArt, idUserDM, idUserDMD, statut]);
    }catch(error){
      console.error('Erreur lors de la création de la demande :', error);
      throw error; // Relancer l'erreur pour qu'elle soit gérée par l'appelant
    }
};

async function Demande(req,res) {
  try {
      const result = await pool.query('SELECT * FROM Demande');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function DemandeVue(req, res) {
  const { userId } = req.params; // Récupère l'ID de l'utilisateur depuis les paramètres de l'URL
  try {
    const result = await pool.query('SELECT * FROM Vue_Demande_Details WHERE user_dmd_id = $1', [userId]);

    if (result.rows.length > 0) {
      // Ne renvoyer que les données nécessaires sans les structures circulaires
      const filteredData = result.rows.map(row => {
        return {
          demande_id: row.demande_id,
          statut_demande: row.statut_demande,
          contrat_id: row.contrat_id,
          art_id: row.art_id,
          art_nom: row.art_nom,
          art_date_debut: row.art_date_debut,
          art_date_fin: row.art_date_fin,
          categorie_nom: row.categorie_nom,
          user_dm_id: row.user_dm_id,
          user_dm_nom: row.user_dm_nom,
          user_dm_email: row.user_dm_email,
          user_dmd_id: row.user_dmd_id,
          user_dmd_nom: row.user_dmd_nom,
          user_dmd_email: row.user_dmd_email
        };
      });
      return res.status(200).json(filteredData);
    } else {
      return res.status(404).json({ message: "Aucune demande trouvée pour cet utilisateur" });
    }
  } catch (error) {
    console.error('Erreur dans DemandeVue :', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des demandes' });
  }
}


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
  createDemandeClient,
  Demande,
  DemandeVue
};
