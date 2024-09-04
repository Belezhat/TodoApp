import { Request, Response } from 'express';
import Todo from '../models/TodoModel';

export const createTodo = async (req: Request, res: Response) => {
    try {
        // Vérifie si la date de rappel est dans le passé
        if (req.body.reminderDate && new Date(req.body.reminderDate) < new Date()) {
            return res.status(400).json({ error: 'La date de rappel doit être une date future.' });
        }

        // Crée une nouvelle tâche avec les données reçues
        const newTodo = await Todo.create(req.body);

       
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création de la tâche.' });
    }
};
