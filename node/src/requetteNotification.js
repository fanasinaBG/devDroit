const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

async function getNotification(req,res) {
    try {
        const result = await pool.query('SELECT * FROM Notification');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

async function createNotification(req,res) {
    const { idUser, objet,description } = req.body;
    try{
        const result = await pool.query('INSERT INTO Notification (idUser, objet,description ) VALUES ($1, $2, $3) RETURNING *', [idUser,objet,description]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports={
    getNotification,
    createNotification
}