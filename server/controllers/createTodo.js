const Todo = require('../models/TodoModel');

exports.createTodo = async (req, res) => {
    try {
        if (req.body.reminderDate && new Date(req.body.reminderDate) < new Date()) {
            return res.status(400).json({ error: 'La date de rappel doit être une date future.' });
        }

        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création de la tâche.' });
    }
};
