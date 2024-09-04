import { useState } from 'react';
import { Todo } from '../types';

type FilterType = "All" | "Active" | "Completed";

export const useFilter = (todos: Todo[]) => {
  console.log('Initialisation du hook useFilter avec les tâches:', todos);

  const [filter, setFilter] = useState<FilterType>('All');
  console.log('Filtre actuel:', filter);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }
    if (filter === 'Completed') {
      return todo.completed;
    }
    return true; // Si le filtre est 'All', toutes les tâches sont retournées sans modification
  });

  console.log('Tâches filtrées:', filteredTodos);

  return { filter, setFilter, filteredTodos };
};


