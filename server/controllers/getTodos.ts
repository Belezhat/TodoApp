import { Request, Response } from 'express';
import Todo from '../models/TodoModel';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    }
};

