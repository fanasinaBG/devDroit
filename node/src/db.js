
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',          
  database: 'tovo',   
  password: 'fanasina',   
  port: 5432,                  
});

pool.connect()
  .then(client => {
    console.log("Connecté à la base de données PostgreSQL !");
    client.release(); // Libérer le client après utilisation
  })
  .catch(err => console.error('Erreur de connexion à la base de données', err.stack));


module.exports = pool;
