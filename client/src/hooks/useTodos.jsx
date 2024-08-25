import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5001/api/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      //console.log("Récupération des tâches");
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des tâches');
        }
        const fetchedTodos = await response.json();
        setTodos(fetchedTodos); // Mise à jour des données récupérées depuis l'API
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    getTodos();
  }, []); // Signifie que l'effet (changement) ne sera effectuer qu'une seule fois, au moment de l'affichage du composant

 
  const addTodo = async (todo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la tâche');
      }
      const newTodo = await response.json();
      /**  // j'utilise le spread operator (...) pour copier tous la liste de tâches actuelles
       * et j'ajoute la nouvelle tâche renvoyée par l'API
       */
      setTodos([...todos, newTodo]); 
    } catch (error) {
      console.error('Erreur:', error);
    }
  };


  const removeTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
       // Mise à jour de l'état en filtrant la liste actuelle des tâches
    // Seules les tâches dont l'identifiant (_id) est différent de celui supprimé sont conservées
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  // Fonction pour basculer l'état (expl: complété) d'une tâche spécifié
  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(todo => todo._id === id);
    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }
      const data = await response.json();
      setTodos(todos.map(todo => 
        todo._id === id ? data : todo
      ));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }
      const data = await response.json();
      setTodos(todos.map(todo => 
        todo._id === id ? data : todo
      ));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
  };
};

