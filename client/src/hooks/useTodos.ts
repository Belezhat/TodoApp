import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, deleteTodo, updateTodo } from '../services/todoService';
import { Todo } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Typage du tableau de tâches

  useEffect(() => {
    const getTodos = async () => {
      //console.log("Récupération des tâches");
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos); // Mise à jour des données récupérées depuis l'API
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches', error);
      }
    };

    getTodos();
  }, []); // Signifie que l'effet (changement) ne sera effectué qu'une seule fois, au moment de l'affichage du composant

  const addTodo = async (todo: Todo): Promise<void> => {
    try {
      const newTodo = await createTodo(todo);
      /** J'utilise le spread operator (...) pour copier toute la liste de tâches actuelle
       * et j'ajoute la nouvelle tâche renvoyée par l'API
       */
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche', error);
    }
  };

  const removeTodo = async (id: string): Promise<void>  => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
      // Mise à jour de l'état en filtrant la liste actuelle des tâches
      // Seules les tâches dont l'identifiant (_id) est différent de celui supprimé sont conservées
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  // Fonction pour basculer l'état (ex: complété) d'une tâche spécifiée
  const toggleTodo = async (id: string): Promise<void>  => {
    const todoToToggle = todos.find(todo => todo._id === id);
    if (!todoToToggle) return;

    const updatedTodo: Todo = { ...todoToToggle, completed: !todoToToggle.completed };

    try {
      const updatedData = await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => 
        todo._id === id ? updatedData : todo
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche', error);
    }
  };

  const handleUpdateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
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



