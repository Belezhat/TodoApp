const mongoose = require('mongoose');

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
}, {
    timestamps: true // Permet l'ajout automatique des champs createdAt et updatedAt
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

