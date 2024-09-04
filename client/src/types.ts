// Permet de definir les propriétés et de quel type elles doivent être.
export interface Todo {
    _id?: string; 
    title: string;
    description?: string; // Le point d'interrogation signifie que c'est optionnel
    completed: boolean;
    reminderDate?: Date; 
    createdAt?: Date; // Pour les timestamps de Mongoose
    updatedAt?: string | Date; 
  }
  