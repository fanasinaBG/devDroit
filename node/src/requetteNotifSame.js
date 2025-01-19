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
    console.log("Corps de la requête:", req.body);
    const { idUserOriginal,idUserCopie,idArtOrgl,idArtcopie,obje} = req.body;
    if (!res) {
        throw new Error('Réponse HTTP (res) non définie');
    }
    try{
        const result = await pool.query('INSERT INTO NotificationSame (idUserOriginal,idUserCopie,idArtOrgl,idArtcopie,objet ) VALUES ($1,$2,$3,$4,$5) RETURNING *', [idUserOriginal,idUserCopie,idArtOrgl,idArtcopie,obje]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports={
    getNotifSame,
    createNotifSame
    
}