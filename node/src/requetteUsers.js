const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

async function getUsers(req, res) {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function checkUsers(req, res) {
    const { email, mdp } = req.body;
    console.log('Email:', email);
    console.log('mdp:', mdp);
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1 AND mdp = $2', [email, mdp]);
      console.log('Résultat de la requête:', result.rows);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows); // Si des utilisateurs sont trouvés
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' }); // Aucun utilisateur trouvé
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

   async function createUser(req, res) {
    const { name, email,mdp } = req.body;
    try {
      const result = await pool.query('INSERT INTO users (name, email,mdp) VALUES ($1, $2, $3) RETURNING *', [name, email,mdp]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  getUsers,
  createUser,
  checkUsers
};