const mongoose = require('mongoose');

// Schéma pour les sous-tâches
const subTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {  
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true 
});

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    completed: {  
        type: Boolean,
        default: false,
    },
    reminderDate: {  // Ajout de la date de rappel
        type: Date,
    },
    subTasks: [subTaskSchema],  // Liste des sous-tâches associées
}, {
    timestamps: true // Permet l'ajout automatique des champs createdAt et updatedAt
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;


