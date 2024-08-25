const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');


const app = express();

// Middleware
app.use(cors()); // Pour autoriser les requêtes entre le frontend et le backend
app.use(express.json()); // Analyse le corps des requêtes qui contiennent des données JSON

// Importation de la route
const todoRoute = require('./routes/todoRoute');

// Utilisation de la route importée
app.use('/api/todos', todoRoute);

const PORT = process.env.PORT || 5001;

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI, { dbName: 'TodoApp' })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connectée à MongoDB: ${PORT}`);
    });
  })
  .catch((err) => console.log(`Connection échouée: ${err}`));
