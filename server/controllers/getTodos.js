const Todo = require('../models/TodoModel');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    }
};
