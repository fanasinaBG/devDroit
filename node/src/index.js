const express = require('express');
const pool = require('./db');
const { getUsers,createUser,checkUsers} = require('./requetteUsers');
const{getArt,createArt,updateArt,CategoryArt,CategoryArtNom}=require('./requetteArt');
const{getCategories}=require('./requetteCategory');
const{getNotifSame,createNotifSame,creeNotifSame}=require('./requetteNotifSame');

const app = express();
const multer = require('multer');
const path = require('path');
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

app.get('/getCategories', getCategories);

app.get('/getArtCategories/:userId', CategoryArt);

app.get('/getNotifSame', getNotifSame);

app.post('/createNotifSame', createNotifSame);

app.get('/categoryArt/:namemArt', CategoryArtNom);


// Configuration multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname)); // Ajout d'un timestamp au nom du fichier
    cb(null,file.originalname);
  },
});

const upload = multer({ storage });

function calculateEndDate(startDate, durationInMonths) {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + parseInt(durationInMonths, 10));
    return endDate.toISOString().split('T')[0]; // Renvoie au format YYYY-MM-DD
}

// Endpoint pour l'upload
app.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    const { duration, category,id } = req.body; // Récupérer la durée et la catégorie
    const files = req.files; // Récupérer les fichiers

    console.log('Body:', req.body);
    console.log('files:', req.files);
    

    if (!files || !duration || !category) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Obtenez la date actuelle
    const startDate = new Date();
    const endDate = calculateEndDate(startDate, duration); // Calcul de la date de fin

   

    // Exemple de stockage dans la base de données
    const queries = files.map(async(file) => {
      const same=await CategoryArtNom(String(file.filename));
      console.log('Nom de fichier vérifié :', file.filename, 'Résultat CategoryArtNom:', same);
      if(same && id !=same.iduser ){
        console.log("useer depuis le session:",id);
        console.log("id USER:", same. iduser);
        const objet='dupliquer';
        const query = `SELECT COUNT(*) AS total FROM Art`;
        const isaColum = await pool.query(query);
        const newId = isaColum.rows[0].total + 1;
        await creeNotifSame(
          id, // idUserOriginal
          same.iduser, // idUserCopie
          same.id, // idArtOrgl
          newId, // idArtcopie
          objet // obje
        );
      }
      return pool.query(
        'INSERT INTO Art (idUser,nom, dateDebut, dateFin) VALUES ($1, $2, $3,$4)',
        [id,String(file.filename),startDate.toISOString().split('T')[0],endDate]
      );
     
    });

    const results=await Promise.all(queries);
    console.log(results);

    res.status(200).json({
       message: 'Fichiers et données enregistrés avec succès !',
       data: results.map((result) => result.rows[0]), 
      });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement des données.' });
  }
});


console.log('Route /checkUsers définie');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });