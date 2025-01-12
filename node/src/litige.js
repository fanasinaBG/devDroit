const express = require('express');
const db = require("db");

const createLitige = (litige, callback) => {
  const { id, idArt1, idArt2, description, dateDebut, statut } = litige;
  const query = `INSERT INTO Litige (id, idArt1, idArt2, description, dateDebut, statut) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(query, [id, idArt1, idArt2, description, dateDebut, statut], callback);
};

const getAllLitiges = (callback) => {
  const query = "SELECT * FROM Litige";
  db.query(query, callback);
};

const getLitigeById = (id, callback) => {
  const query = "SELECT * FROM Litige WHERE id = ?";
  db.query(query, [id], callback);
};

const updateLitige = (id, litige, callback) => {
  const { idArt1, idArt2, description, dateDebut, statut } = litige;
  const query = `UPDATE Litige SET idArt1 = ?, idArt2 = ?, description = ?, dateDebut = ?, statut = ? WHERE id = ?`;
  db.query(query, [idArt1, idArt2, description, dateDebut, statut, id], callback);
};

const deleteLitige = (id, callback) => {
  const query = "DELETE FROM Litige WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createLitige,
  getAllLitiges,
  getLitigeById,
  updateLitige,
  deleteLitige,
};
