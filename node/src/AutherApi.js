const express = require("express");
const bodyParser = require("body-parser");
const {
  createLitige,
  getAllLitiges,
  getLitigeById,
  updateLitige,
  deleteLitige,
} = require("./services/litige");

const app = express.Router();

app.use(bodyParser.json());

app.post("/litiges", (req, res) => {
  createLitige(req.body, (err) => {
    if (err) {
      console.error("Erreur lors de la création:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    res.status(201).json({ message: "Litige créé avec succès." });
  });
});

app.get("/litiges", (req, res) => {
  getAllLitiges((err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération:", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }
    res.status(200).json(results);
  });
});

app.get("/litiges/:id", (req, res) => {
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

app.put("/litiges/:id", (req, res) => {
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

app.delete("/litiges/:id", (req, res) => {
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

module.exports = App;