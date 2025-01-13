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

  module.exports={
    getCategories
  }