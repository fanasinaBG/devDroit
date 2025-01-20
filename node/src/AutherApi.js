const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const {
  createLitige,
  getAllLitiges,
  getLitigeById,
  updateLitige,
  deleteLitige,
} = require("./litige");
const { getContrats, createContrat, getContratById, updateContrat, deleteContrat } = require('./contrats');
const amm = express.Router();

amm.use(bodyParser.json());

amm.post("/litiges", (req, res) => {
  createLitige(req.body, (err) => {
    if (err) {
      console.error("Erreur lors de la création:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    res.status(201).json({ message: "Litige créé avec succès." });
  });
});
amm.get("/litigesdetails", async (req, res) => {
  try {
      const result = await db.query('SELECT * FROM LitigeDetails');
      res.status(200).json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la récupération des litiges." });
  }
});
amm.put('/contrats/:id', async (req, res) => {
  try {
    const updatedContrat = await updateContrat(req.params.id, req.body);
    res.status(200).json(updatedContrat);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contrat:', error);
    res.status(500).send('Erreur serveur');
  }
});
amm.get('/contrats', async (req, res) => {
  try {
    const contrats = await getContrats();
    res.status(200).json(contrats);
  } catch (error) {
    console.error('Erreur lors de la récupération des contrats:', error);
    res.status(500).send('Erreur serveur');
  }
});
amm.post('/contrats', async (req, res) => {
  try {
    const contrat = await createContrat(req.body);
    res.status(201).json(contrat);
  } catch (error) {
    console.error('Erreur lors de la création du contrat:', error);
    res.status(500).send('Erreur serveur');
  }
});
amm.delete('/contrats/:id', async (req, res) => {
  try {
    await deleteContrat(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression du contrat:', error);
    res.status(500).send('Erreur serveur');
  }
});

amm.post("/calculerredevances", async (req, res) => {
  const { idContrat } = req.body;

  try {
      // Récupérer les informations du contrat (type de licence, montant, etc.)
      const contratQuery = await db.query(
          `SELECT c.type_licence, c.idUserDM, c.date_debut, c.date_fin, a.nom AS article, 
                  d.statut AS statut_demande, mp.methodeName
           FROM contrats c
           Left JOIN demande d ON c.id = d.idContrat
           left JOIN art a ON d.idArt = a.id
           left JOIN methodePayer mp ON d.idMethodePayer = mp.id
           WHERE c.id = $1`, 
          [idContrat]
      );
      
      const contrat = contratQuery.rows[0];
      
      if (!contrat) {
          return res.status(404).json({ message: "Contrat non trouvé" });
      }

      // Logique de calcul des redevances
      let pourcentageRedevance;
      if (contrat.type_licence === 'Exclusive') {
          pourcentageRedevance = 0.10; // Exemple de pourcentage de redevance pour un contrat exclusif
      } else if (contrat.type_licence === 'Non-Exclusive') {
          pourcentageRedevance = 0.05; // Exemple de pourcentage pour un contrat non-exclusif
      } else {
          pourcentageRedevance = 0.07; // Pour un type de licence non défini, on peut appliquer un taux par défaut
      }

      // Supposons que le montant à calculer dépend du statut de la demande (exemple de logique)
      let montantBase = 1000; // Valeur de base à ajuster selon votre logique, par exemple les ventes ou autres

      if (contrat.statut_demande === 'Validée') {
          // Si la demande est validée, on applique le pourcentage sur la base
          const montantRedevance = montantBase * pourcentageRedevance;

          // Enregistrement de la redevance calculée dans la table Redevances
          await db.query(
              "INSERT INTO Redevances (idContrat, montantRedevance, dateCalcul) VALUES ($1, $2, CURRENT_DATE)",
              [idContrat, montantRedevance]
          );

          return res.status(200).json({
              message: "Redevance calculée avec succès",
              montantRedevance: montantRedevance
          });
      } else {
          return res.status(400).json({
              message: "Demande non validée, pas de redevance calculée"
          });
      }
  } catch (error) {
      console.error("Erreur lors du calcul des redevances", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
});

amm.get("/litiges", (req, res) => {
  getAllLitiges((err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    res.status(200).json(results);
  });
});

amm.get("/litiges/:id", (req, res) => {
  const { id } = req.params;
  getLitigeById(id, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Litige non trouvé." });
    }
    res.status(200).json(results[0]);
  });
});

amm.put("/litiges/:id", (req, res) => {
  const { id } = req.params;
  updateLitige(id, req.body, (err, result) => {
    if (err) {
      console.error("Erreur lors de la mise à jour:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Litige non trouvé." });
    }
    res.status(200).json({ message: "Litige mis à jour avec succès." });
  });
});

amm.delete("/litiges/:id", (req, res) => {
  const { id } = req.params;
  deleteLitige(id, (err, result) => {
    if (err) {
      console.error("Erreur lors de la suppression:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Litige non trouvé." });
    }
    res.status(200).json({ message: "Litige supprimé avec succès." });
  });
});

module.exports = amm;
