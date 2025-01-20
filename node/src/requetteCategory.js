const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());


async function getCategories(req, res) {
    try {
      const result = await pool.query('SELECT * FROM Categories');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getIDCategories(category) {
    try {
      const result = await pool.query('SELECT id FROM Categories Where name = $1',[category]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la création de la notification : ${error.message}`);
    }
  }

  module.exports={
    getCategories,
    getIDCategories
  }