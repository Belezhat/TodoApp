const Todo = require('../models/TodoModel');

exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(400).json({ error: 'information érronnée.' });
        }
        res.status(200).json({ message: 'Tâche supprimée' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la tâche.' });
    }
};
