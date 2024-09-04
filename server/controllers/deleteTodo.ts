import { Request, Response } from 'express';
import Todo from '../models/TodoModel';

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            res.status(400).json({ error: 'information érronnée.' });
            return;
        }
        res.status(200).json({ message: 'Tâche supprimée' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la tâche.' });
    }
};
