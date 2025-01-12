const express = require('express');
const pool = require('./db');
const { getUsers,createUser} = require('./requetteUsers');
const{getArt,createArt,updateArt}=require('./requetteArt');
const{getNotification,createNotification}=require('./requetteNotification');

const app = express();
app.use(express.json());


app.get('/getUsers', getUsers);
app.post('/createUsers', createUser); 

app.get('/getArt',getArt);
app.post('/createArt', createArt);
app.put('/updateArt/:id',updateArt);

app.get('/getNotification',getNotification);
app.post('/createNotification',createNotification);


console.log(getUsers);
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });