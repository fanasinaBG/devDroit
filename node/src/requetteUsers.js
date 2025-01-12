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
  createUser
};