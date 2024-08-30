const express = require('express');
const router = express.Router();
const todoController = require('../controllers/import.js');


router.post('/', todoController.createTodo);


router.get('/', todoController.getTodos);

// Route pour mettre à jour une tâche spécifique 
router.put('/:id', todoController.updateTodo);
// Lorsqu'une requête est envoyée à cette route, la fonction updateTodo du contrôleur sera appelée

router.delete('/:id', todoController.deleteTodo);

module.exports = router;


