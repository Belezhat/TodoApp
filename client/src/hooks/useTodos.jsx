import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, deleteTodo, updateTodo } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      //console.log("Récupération des tâches");
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos); // Mise à jour des données récupérées depuis l'AP
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
      }
    };

    getTodos();
  }, []); // Signifie que l'effet (changement) ne sera effectuer qu'une seule fois, au moment de l'affichage du composant

  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
       /** J'utilise le spread operator (...) pour copier tous la liste de tâches actuelles
       * et j'ajoute la nouvelle tâche renvoyée par l'API
       */
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
       // Mise à jour de l'état en filtrant la liste actuelle des tâches
    // Seules les tâches dont l'identifiant (_id) est différent de celui supprimé sont conservées
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

    // Fonction pour basculer l'état (expl: complété) d'une tâche spécifié
  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(todo => todo._id === id);
    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
    
    try {
      const updatedData = await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => 
        todo._id === id ? updatedData : todo
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche', error);
    }
  };

  
  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const updatedData = await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo =>
        todo._id === id ? updatedData : todo
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche', error);
    }
  };

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo: handleUpdateTodo, 
  };
};


