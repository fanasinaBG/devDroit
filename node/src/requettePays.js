const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

async function getPays(req, res){
    try {
        const result = await pool.query('SELECT * FROM Pays');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports={
    getPays
}