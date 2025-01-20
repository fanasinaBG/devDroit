const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

async function getNotifSame(req,res) {
    try {
        const result = await pool.query('SELECT * FROM NotificationSame');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

async function createNotifSame(req,res) {
    const { idUser,objet} = req.body;
    try{
        const result = await pool.query('INSERT INTO NotificationSame (idUser,objet ) VALUES ($1, $2) RETURNING *', [idUser,objet]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports={
    getNotifSame,
    createNotifSame
    
}