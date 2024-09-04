import { Request, Response } from 'express';
import Todo from '../models/TodoModel';

interface ReqParams {
    id: string;
}

export const updateTodo = async (req: Request<ReqParams>, res: Response) => {
    try {
        if (req.body && req.body.reminderDate && new Date(req.body.reminderDate) < new Date()) {
            return res.status(400).json({ error: 'La date de rappel doit être une date future.' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Renvoie la tâche mise à jour
        );

        if (!updatedTodo) {
            return res.status(400).json({ error: 'Information erronée.' });
        }

        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
    }
};


