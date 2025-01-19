const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

async function getArt(req,res) {
    try {
        const result = await pool.query('SELECT * FROM Art');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

async function createArt(req,res) {
    const { idUser, nom,dateDebut,dateFin } = req.body;
    try{
        const result = await pool.query('INSERT INTO Art (idUser, nom,dateDebut,dateFin ) VALUES ($1, $2, $3, $4) RETURNING *', [idUser, nom,dateDebut,dateFin ]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

async function updateArt(req,res) {
    const { id } = req.params;
    const {idUser,nom,dateDebut,dateFin } = req.body;
    try {
      const result = await pool.query('UPDATE Art SET idUser = $1, nom = $2 ,dateDebut=$3 ,dateFin=$4 WHERE id = $5 RETURNING *', [idUser,nom,dateDebut,dateFin,id]);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Art non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

async function CategoryArt(req,res) {
  const { userId } = req.params; 
  console.log('userId:', userId);
  try {
    const result = await pool.query('SELECT * FROM ArtCategoriesView WHERE UserID = $1', [userId]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: 'ArCartegory non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function CategoryArtNom(namemArt) {
  try {
    console.log('Reçu dans CategoryArtNom:', namemArt, 'Type:', typeof namemArt);
    const result = await pool.query(
      'SELECT id,idUser,nom FROM Art WHERE nom = $1',
      [namemArt]
    );

    if (result.rows.length > 0) {
      return result.rows[0]; // Renvoie le résultat si trouvé
    } else {
      return null; // Renvoie null si non trouvé
    }
  } catch (error) {
    console.error('Erreur dans CategoryArtNom :', error);
    throw error; // Propage l'erreur pour que l'appelant puisse la gérer
  }
}



module.exports={
    getArt,
    createArt,
    updateArt,
    CategoryArt,
    CategoryArtNom
}
