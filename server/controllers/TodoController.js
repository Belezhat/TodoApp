const Todo = require('../models/TodoModel');

// Création d'une nouvelle tâche en utilisant les données du corps de la requête
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


exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos); 
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches.' });
    }
};


exports.updateTodo = async (req, res) => {
    try {
        
        if (req.body.reminderDate && new Date(req.body.reminderDate) < new Date()) {
            return res.status(400).json({ error: 'La date de rappel doit être une date future.' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Renvoie la tâche mise à jour
        );
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Tâche non trouvée.' });
        }
        res.status(200).json(updatedTodo); 
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche.' });
    }
};


exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Tâche non trouvée.' });
        }
        res.status(200).json({ message: 'Tâche supprimée' }); 
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la tâche.' });
    }
};



