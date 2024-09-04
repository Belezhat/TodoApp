import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/index';

const router = express.Router();

router.post('/', createTodo);

router.get('/', getTodos);

// Route pour mettre à jour une tâche spécifique
router.put('/:id', updateTodo);
// Lorsqu'une requête est envoyée à cette route, la fonction updateTodo du contrôleur sera appelée

router.delete('/:id', deleteTodo);

export default router;

