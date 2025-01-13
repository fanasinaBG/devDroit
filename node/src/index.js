const express = require('express');
const pool = require('./db');
const { getUsers,createUser,checkUsers} = require('./requetteUsers');
const{getArt,createArt,updateArt}=require('./requetteArt');
const{getNotification,createNotification}=require('./requetteNotification');
const{getCategories}=require('./requetteCategory');

const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/checkUsers', (req, res) => {
//   console.log('Route /checkUsers atteinte');
//   checkUsers(req, res);
// });
// app.post('/checkUsers', checkUsers);

app.post('/checkUsers', async (req, res) => {
  const { email, mdp } = req.body;
  console.log('Email:', email);
  console.log('Mot de passe:', mdp);

  try {
    // Exécute la requête SQL pour vérifier si l'utilisateur existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND mdp = $2', [email, mdp]);

    // Vérifie si des utilisateurs ont été trouvés
    if (result.rows.length > 0) {
      // Si l'utilisateur est trouvé, renvoyer les détails de l'utilisateur
      console.log('Utilisateur trouvé:', result.rows);
      res.status(200).json(result.rows); // Vous pouvez personnaliser cette réponse selon vos besoins
    } else {
      // Si aucun utilisateur n'est trouvé, renvoyer un message d'erreur
      console.log('Aucun utilisateur trouvé pour ces identifiants');
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur de requête:', error.message);
    // En cas d'erreur interne, renvoyer un statut 500 avec l'erreur
    res.status(500).json({ error: error.message });
  }
});
app.get('/getUsers', getUsers);
app.post('/createUsers', createUser); 

app.get('/getArt',getArt);
app.post('/createArt', createArt);
app.put('/updateArt/:id',updateArt);

app.get('/getNotification',getNotification);
app.post('/createNotification',createNotification);

app.get('/getCategories', getCategories);


console.log('Route /checkUsers définie');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });