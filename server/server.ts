import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Autoriser les requêtes du frontend au backend
app.use(express.json()); // Analyser le corps des requêtes JSON

// Importation de la route
import todoRoute from './routes/todoRoute';

// Utilisation de la route importée
app.use('/api/todos', todoRoute);

const PORT = process.env.PORT || 5001;

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI || '', { dbName: 'TodoApp' })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connecté à MongoDB et serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Erreur de connexion : ${err}`));

